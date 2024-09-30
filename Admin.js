const adminUsername = 'admin';
const adminPassword = 'password123';  // No hashing

const AdminLogin = (req, res) => {
    const { username, password } = req.body;

    if (username === adminUsername && password === adminPassword) {
        return res.json({ success: true, message: 'Login successful' });
    }

    res.json({ success: false, message: 'Invalid username or password' });
};

module.exports = { AdminLogin };
