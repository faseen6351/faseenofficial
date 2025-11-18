<?php
// Chatbot API handler
session_start();

header('Content-Type: application/json');

// Rate limiting
if (!isset($_SESSION['last_chat_time'])) {
    $_SESSION['last_chat_time'] = 0;
}

$current_time = time();
if ($current_time - $_SESSION['last_chat_time'] < 2) { // 2 second cooldown
    http_response_code(429);
    echo json_encode([
        'status' => 'error',
        'message' => 'Please wait before sending another message'
    ]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
    exit;
}

// Initialize chat session
if (!isset($_SESSION['chat_history'])) {
    $_SESSION['chat_history'] = [];
}

if (!isset($_SESSION['visitor_name'])) {
    $_SESSION['visitor_name'] = '';
}

if (!isset($_SESSION['conversation_context'])) {
    $_SESSION['conversation_context'] = [];
}

// Get input
$input = json_decode(file_get_contents('php://input'), true);
$message = filter_var($input['message'] ?? '', FILTER_SANITIZE_STRING);
$visitorName = filter_var($input['visitorName'] ?? $_SESSION['visitor_name'], FILTER_SANITIZE_STRING);

if (empty($message)) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Message is required'
    ]);
    exit;
}

// Update session
if ($visitorName) {
    $_SESSION['visitor_name'] = $visitorName;
}

// Local knowledge base
$knowledgeBase = [
    'greeting' => [
        'patterns' => ['/^(hi|hello|hey|good morning|good afternoon|good evening)/i'],
        'response' => "Hello{name}! I'm Elly, Mohamed's AI assistant. I'm here to help you learn about his work and explore how he might be able to help you. What brings you to Mohamed's portfolio today?"
    ],
    'react' => [
        'patterns' => ['/react/i', '/reactjs/i', '/react\.js/i'],
        'response' => "Great question about Mohamed's React experience{name}! He has advanced React skills with professional experience at Absons IT Solutions. He works with modern React patterns, TypeScript, hooks, and state management. Would you like to know about specific React projects he's worked on?"
    ],
    'php' => [
        'patterns' => ['/php/i', '/backend/i', '/server/i'],
        'response' => "Mohamed has advanced PHP skills{name}! He uses PHP for server-side development, API creation, and backend architecture. He's experienced with modern PHP practices and frameworks. Are you looking for PHP development help for a specific project?"
    ],
    '3d' => [
        'patterns' => ['/3d/i', '/three\.js/i', '/threejs/i', '/blender/i', '/unity/i'],
        'response' => "Mohamed's 3D work is quite impressive{name}! He works with Three.js for web-based 3D experiences, Blender for modeling and animation, and has some Unity experience. His approach combines programming skills with creative problem-solving. What kind of 3D project are you interested in?"
    ],
    'availability' => [
        'patterns' => ['/available/i', '/availability/i', '/hire/i', '/hiring/i', '/work/i', '/collaboration/i'],
        'response' => "Mohamed is currently at Absons IT Solutions but is open to discussing interesting consulting opportunities{name}. He values meaningful projects and collaborative relationships. What type of project are you considering?"
    ],
    'contact' => [
        'patterns' => ['/contact/i', '/email/i', '/phone/i', '/reach/i', '/get in touch/i'],
        'response' => "You can reach Mohamed at faseenofficial@gmail.com{name} or call +971 50 983 8149. He typically responds within 24 hours and is based in Abu Dhabi, UAE (UTC+4). He holds his own visa. Would you like me to help you prepare your message or learn more about his work first?"
    ],
    'skills' => [
        'patterns' => ['/skills/i', '/experience/i', '/expertise/i', '/technologies/i', '/tech stack/i'],
        'response' => "Mohamed has a diverse skill set{name}! His main expertise includes React (Advanced), PHP (Advanced), Python (Advanced), 3D development with Three.js and Blender, and Flutter for mobile apps. He also has experience with AI/ML using TensorFlow. What specific technology are you interested in learning about?"
    ]
];

// Intent detection
function detectIntent($message, $knowledgeBase) {
    foreach ($knowledgeBase as $intent => $data) {
        foreach ($data['patterns'] as $pattern) {
            if (preg_match($pattern, $message)) {
                return $intent;
            }
        }
    }
    return 'general';
}

// Extract name from message
function extractName($message) {
    if (preg_match('/(my name is|i\'m|i am|call me)\s+([a-zA-Z]+)/i', $message, $matches)) {
        return $matches[2];
    }
    return null;
}

// Detect intent
$intent = detectIntent($message, $knowledgeBase);

// Extract name if provided
$extractedName = extractName($message);
if ($extractedName) {
    $_SESSION['visitor_name'] = $extractedName;
    $visitorName = $extractedName;
}

// Generate response
$response = '';
$nameTag = $visitorName ? ", $visitorName" : '';

if (isset($knowledgeBase[$intent])) {
    $response = str_replace('{name}', $nameTag, $knowledgeBase[$intent]['response']);
} else {
    // Use OpenRouter API for complex queries
    $apiKey = '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';
    $apiUrl = 'https://openrouter.ai/api/v1/chat/completions';
    
    $systemPrompt = "You are Elly, the personal AI assistant for Mohamed Fasin, a skilled software engineer at Absons IT Solutions. You embody his INFJ personality traits: empathetic, insightful, calm, and genuinely helpful.

Current conversation context:
- Visitor name: $visitorName
- Previous context: " . implode('\n', $_SESSION['conversation_context']) . "

Mohamed's key information:
- Current Role: Software Engineer at Absons IT Solutions (since Oct 2024)
- Location: Sri Lanka
- Personality: INFJ - empathetic, detail-oriented, calm problem-solver
- Education: Computer Science, Sahrdaya College (2016-2022)
- Certifications: CCNP (Cisco), Microsoft Python (2019)

Technical Expertise:
- React (Advanced): Professional experience, TypeScript, modern patterns
- PHP (Advanced): Backend development, API creation
- Python (Advanced): Backend, data analysis, AI/ML basics
- 3D Development: Three.js, Blender, Unity basics
- Mobile: Flutter development

Your role is to help visitors understand Mohamed's skills and experience, guide them to relevant portfolio sections, identify collaboration opportunities, and maintain warm, professional conversation. Keep responses under 150 words and conversational.";

    $payload = [
        'model' => 'qwen/qwen-2.5-32b-instruct:free',
        'messages' => [
            ['role' => 'system', 'content' => $systemPrompt],
            ['role' => 'user', 'content' => $message]
        ],
        'max_tokens' => 300,
        'temperature' => 0.7
    ];
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $apiUrl);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: Bearer ' . $apiKey,
        'Content-Type: application/json',
        'HTTP-Referer: ' . ($_SERVER['HTTP_HOST'] ?? 'localhost'),
        'X-Title: Mohamed Fasin Portfolio'
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    
    $apiResponse = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode === 200 && $apiResponse) {
        $responseData = json_decode($apiResponse, true);
        if (isset($responseData['choices'][0]['message']['content'])) {
            $response = $responseData['choices'][0]['message']['content'];
        } else {
            $response = "I'm having trouble processing that right now$nameTag. Could you try rephrasing your question? I'm here to help you learn about Mohamed's work and expertise.";
        }
    } else {
        // Fallback response
        $response = "I'm having some technical difficulties right now$nameTag. Mohamed specializes in React, PHP, Python, and 3D development. He's currently at Absons IT Solutions and available for consulting. What specific area would you like to know about?";
    }
}

// Update conversation context
$_SESSION['conversation_context'][] = $message;
$_SESSION['conversation_context'] = array_slice($_SESSION['conversation_context'], -10); // Keep last 10 messages

// Add to chat history
$_SESSION['chat_history'][] = [
    'user' => $message,
    'bot' => $response,
    'timestamp' => date('Y-m-d H:i:s')
];

// Update rate limiting
$_SESSION['last_chat_time'] = $current_time;

// Log the conversation
$chatLog = [
    'timestamp' => date('Y-m-d H:i:s'),
    'visitorName' => $visitorName,
    'message' => $message,
    'response' => $response,
    'intent' => $intent,
    'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown'
];

$chatLogFile = '../data/chat_logs.json';
$logs = [];
if (file_exists($chatLogFile)) {
    $logs = json_decode(file_get_contents($chatLogFile), true) ?? [];
}
$logs[] = $chatLog;

if (!is_dir('../data')) {
    mkdir('../data', 0755, true);
}

file_put_contents($chatLogFile, json_encode($logs, JSON_PRETTY_PRINT));

echo json_encode([
    'status' => 'success',
    'message' => $response,
    'intent' => $intent,
    'visitorName' => $visitorName
]);
?>