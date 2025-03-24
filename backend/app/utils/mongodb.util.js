const mongoose = require('mongoose');

class MongoDB {
    static async connect(uri) {
        try {
            await mongoose.connect(uri);
            console.log('Kết nối MongoDB thành công!');
        } catch (err) {
            console.error('Lỗi kết nối MongoDB:', err.message);
            throw err;
        }
    }
}

module.exports = MongoDB;
