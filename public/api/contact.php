<?php
// Contact form handler
session_start();

header('Content-Type: application/json');

// Rate limiting
if (!isset($_SESSION['last_contact_time'])) {
    $_SESSION['last_contact_time'] = 0;
}

$current_time = time();
if ($current_time - $_SESSION['last_contact_time'] < 60) { // 1 minute cooldown
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

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

// Validate required fields
$name = filter_var($input['name'] ?? '', FILTER_SANITIZE_STRING);
$email = filter_var($input['email'] ?? '', FILTER_SANITIZE_EMAIL);
$phone = filter_var($input['phone'] ?? '', FILTER_SANITIZE_STRING);
$projectType = filter_var($input['projectType'] ?? '', FILTER_SANITIZE_STRING);
$message = filter_var($input['message'] ?? '', FILTER_SANITIZE_STRING);
$preferredContact = filter_var($input['preferredContact'] ?? 'email', FILTER_SANITIZE_STRING);

// Validation
if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Name, email, and message are required'
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid email format'
    ]);
    exit;
}

// Create submission data
$submission = [
    'id' => uniqid(),
    'name' => $name,
    'email' => $email,
    'phone' => $phone,
    'projectType' => $projectType,
    'message' => $message,
    'preferredContact' => $preferredContact,
    'timestamp' => date('Y-m-d H:i:s'),
    'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
    'userAgent' => $_SERVER['HTTP_USER_AGENT'] ?? 'unknown',
    'status' => 'new'
];

// Save to JSON file
$dataFile = '../data/submissions.json';
$submissions = [];

if (file_exists($dataFile)) {
    $submissions = json_decode(file_get_contents($dataFile), true) ?? [];
}

$submissions[] = $submission;

// Ensure data directory exists
if (!is_dir('../data')) {
    mkdir('../data', 0755, true);
}

file_put_contents($dataFile, json_encode($submissions, JSON_PRETTY_PRINT));

// Send email notification (simplified version)
$emailContent = "New contact form submission:\n\n";
$emailContent .= "Name: $name\n";
$emailContent .= "Email: $email\n";
$emailContent .= "Phone: $phone\n";
$emailContent .= "Project Type: $projectType\n";
$emailContent .= "Preferred Contact: $preferredContact\n";
$emailContent .= "Message: $message\n";
$emailContent .= "Timestamp: " . $submission['timestamp'] . "\n";
$emailContent .= "IP: " . $submission['ip'] . "\n";

// Simple mail function (you can enhance this with PHPMailer)
$to = 'faseenofficial@gmail.com';
$subject = 'New Portfolio Contact Form Submission';
$headers = "From: noreply@mohamedfasin.com\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Attempt to send email
$emailSent = mail($to, $subject, $emailContent, $headers);

// Update session
$_SESSION['last_contact_time'] = $current_time;

// Log the submission
error_log("Contact form submission: " . json_encode($submission));

echo json_encode([
    'status' => 'success',
    'message' => 'Thank you for your message! I will get back to you within 24 hours.',
    'emailSent' => $emailSent
]);
?>