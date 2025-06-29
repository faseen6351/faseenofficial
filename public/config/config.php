<?php
// Configuration file for the portfolio backend

// Database configuration (if needed in the future)
define('DB_HOST', 'localhost');
define('DB_NAME', 'portfolio');
define('DB_USER', 'portfolio_user');
define('DB_PASS', 'secure_password');

// Email configuration
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_PORT', 587);
define('SMTP_USERNAME', 'faseenofficial@gmail.com');
define('SMTP_PASSWORD', ''); // Set via environment variable

// Security configuration
define('SESSION_TIMEOUT', 3600); // 1 hour
define('MAX_LOGIN_ATTEMPTS', 3);
define('LOCKOUT_DURATION', 600); // 10 minutes
define('RATE_LIMIT_WINDOW', 60); // 1 minute
define('RATE_LIMIT_REQUESTS', 10);

// API configuration
define('OPENROUTER_API_KEY', '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');
define('OPENROUTER_API_URL', 'https://openrouter.ai/api/v1/chat/completions');
define('CHATBOT_MODEL', 'qwen/qwen-2.5-32b-instruct:free');

// File paths
define('DATA_DIR', __DIR__ . '/../data/');
define('LOG_DIR', __DIR__ . '/../logs/');

// Ensure directories exist
if (!is_dir(DATA_DIR)) {
    mkdir(DATA_DIR, 0755, true);
}

if (!is_dir(LOG_DIR)) {
    mkdir(LOG_DIR, 0755, true);
}

// Error reporting
if (getenv('ENVIRONMENT') === 'development') {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
} else {
    error_reporting(0);
    ini_set('display_errors', 0);
    ini_set('log_errors', 1);
    ini_set('error_log', LOG_DIR . 'php_errors.log');
}

// Timezone
date_default_timezone_set('Asia/Colombo');

// Session configuration
ini_set('session.cookie_httponly', 1);
ini_set('session.cookie_secure', 1);
ini_set('session.use_strict_mode', 1);
?>