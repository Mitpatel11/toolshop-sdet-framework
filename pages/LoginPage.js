
class LoginPage {
    constructor(page) {
        this.page = page;
        this.emailId = page.getByPlaceholder("Your email");
        this.pwd = page.getByPlaceholder("Your password");
        this.loginbtn = page.getByRole('button', { name: "Login" });
    }

    async login(email, password) {
        await this.emailId.first().fill(email);
        await this.pwd.first().fill(password);
        await this.loginbtn.click();
    }

}
module.exports = { LoginPage };