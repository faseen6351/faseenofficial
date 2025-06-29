<?php
// Admin panel handler
session_start();

header('Content-Type: application/json');

// Security configuration
define('ADMIN_USERNAME', 'fasin_admin');
define('ADMIN_PASSWORD_HASH', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'); // SecurePass2025!
define('MAX_LOGIN_ATTEMPTS', 3);
define('LOCKOUT_DURATION', 600); // 10 minutes

// Initialize session variables
if (!isset($_SESSION['login_attempts'])) {
    $_SESSION['login_attempts'] = 0;
}

if (!isset($_SESSION['lockout_time'])) {
    $_SESSION['lockout_time'] = 0;
}

// Check if account is locked
if ($_SESSION['lockout_time'] > time()) {
    $remaining = $_SESSION['lockout_time'] - time();
    http_response_code(423);
    echo json_encode([
        'status' => 'locked',
        'message' => 'Account locked due to multiple failed attempts',
        'remainingTime' => $remaining
    ]);
    exit;
}

// Handle different request methods
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    // Login attempt
    $input = json_decode(file_get_contents('php://input'), true);
    $username = filter_var($input['username'] ?? '', FILTER_SANITIZE_STRING);
    $password = $input['password'] ?? '';
    
    // Log the attempt
    $attemptLog = [
        'timestamp' => date('Y-m-d H:i:s'),
        'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
        'userAgent' => $_SERVER['HTTP_USER_AGENT'] ?? 'unknown',
        'username' => $username,
        'success' => false
    ];
    
    // Check for SQL injection patterns
    $sqlPatterns = ['/\'/', '/OR/i', '/AND/i', '/UNION/i', '/SELECT/i', '/DROP/i', '/INSERT/i', '/DELETE/i', '/--/', '/;/'];
    $isSQLInjection = false;
    
    foreach ($sqlPatterns as $pattern) {
        if (preg_match($pattern, $username) || preg_match($pattern, $password)) {
            $isSQLInjection = true;
            break;
        }
    }
    
    // Check for basic attack patterns
    $basicAttacks = [
        ['admin', '1'],
        ['admin', 'admin'],
        ['root', 'root'],
        ['1', '1']
    ];
    
    $isBasicAttack = false;
    foreach ($basicAttacks as $attack) {
        if ($username === $attack[0] && $password === $attack[1]) {
            $isBasicAttack = true;
            break;
        }
    }
    
    // Log security events
    if ($isSQLInjection || $isBasicAttack) {
        $securityLog = [
            'timestamp' => date('Y-m-d H:i:s'),
            'event' => $isSQLInjection ? 'SQL Injection Attempt' : 'Basic Attack Attempt',
            'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
            'userAgent' => $_SERVER['HTTP_USER_AGENT'] ?? 'unknown',
            'username' => $username,
            'password' => $password,
            'severity' => 'critical'
        ];
        
        // Save security log
        $securityFile = '../data/security_logs.json';
        $logs = [];
        if (file_exists($securityFile)) {
            $logs = json_decode(file_get_contents($securityFile), true) ?? [];
        }
        $logs[] = $securityLog;
        
        if (!is_dir('../data')) {
            mkdir('../data', 0755, true);
        }
        
        file_put_contents($securityFile, json_encode($logs, JSON_PRETTY_PRINT));
        
        // Increase attempts for security violations
        $_SESSION['login_attempts'] += 2;
    }
    
    // Validate credentials
    if ($username === ADMIN_USERNAME && password_verify($password, ADMIN_PASSWORD_HASH)) {
        $_SESSION['admin_authenticated'] = true;
        $_SESSION['login_attempts'] = 0;
        $_SESSION['lockout_time'] = 0;
        
        $attemptLog['success'] = true;
        
        echo json_encode([
            'status' => 'success',
            'message' => 'Login successful'
        ]);
    } else {
        $_SESSION['login_attempts']++;
        
        if ($_SESSION['login_attempts'] >= MAX_LOGIN_ATTEMPTS) {
            $_SESSION['lockout_time'] = time() + LOCKOUT_DURATION;
            $_SESSION['login_attempts'] = 0;
        }
        
        http_response_code(401);
        echo json_encode([
            'status' => 'error',
            'message' => 'Invalid credentials',
            'attemptsRemaining' => max(0, MAX_LOGIN_ATTEMPTS - $_SESSION['login_attempts'])
        ]);
    }
    
    // Log the attempt
    $attemptFile = '../data/login_attempts.json';
    $attempts = [];
    if (file_exists($attemptFile)) {
        $attempts = json_decode(file_get_contents($attemptFile), true) ?? [];
    }
    $attempts[] = $attemptLog;
    
    if (!is_dir('../data')) {
        mkdir('../data', 0755, true);
    }
    
    file_put_contents($attemptFile, json_encode($attempts, JSON_PRETTY_PRINT));
    
} elseif ($method === 'GET') {
    // Check authentication and return data
    if (!isset($_SESSION['admin_authenticated']) || !$_SESSION['admin_authenticated']) {
        http_response_code(401);
        echo json_encode([
            'status' => 'error',
            'message' => 'Authentication required'
        ]);
        exit;
    }
    
    // Return admin dashboard data
    $data = [
        'status' => 'success',
        'data' => [
            'submissions' => [],
            'securityLogs' => [],
            'loginAttempts' => [],
            'analytics' => [
                'totalSubmissions' => 0,
                'securityEvents' => 0,
                'lastLogin' => date('Y-m-d H:i:s')
            ]
        ]
    ];
    
    // Load submissions
    $submissionsFile = '../data/submissions.json';
    if (file_exists($submissionsFile)) {
        $data['data']['submissions'] = json_decode(file_get_contents($submissionsFile), true) ?? [];
        $data['data']['analytics']['totalSubmissions'] = count($data['data']['submissions']);
    }
    
    // Load security logs
    $securityFile = '../data/security_logs.json';
    if (file_exists($securityFile)) {
        $data['data']['securityLogs'] = json_decode(file_get_contents($securityFile), true) ?? [];
        $data['data']['analytics']['securityEvents'] = count($data['data']['securityLogs']);
    }
    
    // Load login attempts
    $attemptsFile = '../data/login_attempts.json';
    if (file_exists($attemptsFile)) {
        $data['data']['loginAttempts'] = json_decode(file_get_contents($attemptsFile), true) ?? [];
    }
    
    echo json_encode($data);
    
} elseif ($method === 'DELETE') {
    // Logout
    session_destroy();
    echo json_encode([
        'status' => 'success',
        'message' => 'Logged out successfully'
    ]);
    
} else {
    http_response_code(405);
    echo json_encode([
        'status' => 'error',
        'message' => 'Method not allowed'
    ]);
}
?>