const testEmail = (email) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email) ? undefined : 'Đây không phải Email';
};

const testPassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (password.length < 8) {
        return 'Mật khẩu phải chứa ít nhất 8 ký tự';
    } else if (!regex.test(password)) {
        return 'Mật khẩu phải chứa ký tự đặc biệt, chữ viết hoa và chứ thường';
    }

    return false;
};

export { testEmail, testPassword };
