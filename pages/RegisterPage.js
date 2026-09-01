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
        this.allalerts = page.getByRole('alert');

        this.firstNameRequiredError = page.getByText('First name is required', { exact: true });
        this.lastNameRequiredError = page.getByText('Last name is required', { exact: true });
        this.countryRequiredError = page.getByText('Country is required', { exact: true });
        this.postalCodeRequiredError = page.getByText('Postcode is required', { exact: true });
        this.houseNumberRequiredError = page.getByText('House number is required', { exact: true });
        this.streetRequiredError = page.getByText('Street is required', { exact: true });
        this.cityRequiredError = page.getByText('City is required', { exact: true });
        this.stateRequiredError = page.getByText('State is required', { exact: true });
        this.phoneRequiredError = page.getByText('Phone is required.', { exact: true });
        this.emailRequiredError = page.getByText('Email is required', { exact: true });
        this.emailInvalidFormatError = page.getByText('Email format is invalid', { exact: true });
        this.dobInvalidFormatError = page.getByText(' Please enter a valid date in YYYY-MM-DD format. ', { exact: true });
        this.passwordRequiredError = page.getByText(' Password is required ', { exact: true });
        this.dobRequiredError = page.getByText('Date of Birth is required', { exact: true });
        this.passwordInvalidChars = page.getByText(' Password must be minimal 6 characters long. ', { exact: true });
        this.passwordDataLeak = page.getByText('The given password has appeared in a data leak. Please choose a different password.', { exact: true });

        this.dobUnder18Error = page.getByText('Customer must be 18 years old.', { exact: true });
        this.dobOver75Error = page.getByText('Customer must be younger than 75 years old.', { exact: true });
        this.phoneInvalidCharsError = page.getByText('Only numbers are allowed.', { exact: true });
        this.emailAlreadyInUseError = page.getByText('A customer with this email address already exists.', { exact: true });
    }

    get requiredFieldErrors() {
        return [
            this.firstNameRequiredError,
            this.lastNameRequiredError,
            this.dobRequiredError,
            this.countryRequiredError,
            this.postalCodeRequiredError,
            this.houseNumberRequiredError,
            this.streetRequiredError,
            this.cityRequiredError,
            this.stateRequiredError,
            this.phoneRequiredError,
            this.emailRequiredError,
            this.passwordRequiredError,
        ];
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

    async blankRegister() {
        await this.registerbtn.click();
    }

    async invalidEmail(invalidEmail) {
        await this.emailinput.fill(invalidEmail);
        await this.registerbtn.click();
    }
}

module.exports = { RegisterPage };