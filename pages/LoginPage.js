
class LoginPage {
    constructor(page) {
        this.page = page;
        this.emailId = page.getByPlaceholder("Your email");
        this.pwd = page.getByPlaceholder("Your password");
        this.loginbtn = page.getByRole('button', { name: "Login" });
        this.registerbtn = page.getByRole('link', { name: "Register your account" });
    }

    async login(email, password) {
        await this.emailId.first().fill(email);
        await this.pwd.first().fill(password);
        await this.loginbtn.click();
    }

    async clickRegister() {
        await this.registerbtn.click();
    }

}
module.exports = { LoginPage };