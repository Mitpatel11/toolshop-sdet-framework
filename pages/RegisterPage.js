class RegisterPage {
    constructor(page) {
        this.firstname = page.getByLabel('First Name');
        this.lastname = page.getByLabel('Last Name');
        this.dob = page.getByLabel('Date of Birth *');
        this.countrydropdown = page.getByLabel('Country');
        this.postalcode = page.getByLabel('Postal Code');
        this.housenumber = page.getByLabel('House Number');
        this.streetinput = page.getByLabel('Street');
        this.cityinput = page.getByLabel('City');
        this.stateinput = page.getByLabel('State');
        this.phoneinput = page.getByLabel('Phone');
        this.emailinput = page.getByLabel('Email address');
        this.passwordinput = page.getByLabel('Password');
        this.registerbtn = page.getByRole('button', { name: "Register " });
    }

    async registerAccount(details) {
        await this.firstname.fill(details.firstName);
        await this.lastname.fill(details.lastName);
        await this.dob.fill(details.dateOfBirth);
        await this.countrydropdown.selectOption(details.address.country);
        await this.postalcode.fill(details.address.postalCode);
        await this.housenumber.fill(details.address.houseNumber);
        await this.streetinput.fill(details.address.street);
        await this.cityinput.fill(details.address.city);
        await this.stateinput.fill(details.address.state);
        await this.phoneinput.fill(details.phone);
        await this.emailinput.fill(details.email);
        await this.passwordinput.fill(details.password);
        await this.registerbtn.click();
    }
}

module.exports = { RegisterPage };