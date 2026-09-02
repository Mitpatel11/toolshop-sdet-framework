class API_utils {
    constructor(request, loginPayload, registerPayload) {
        this.request = request;
    }

    async postLoginResponse(payload) {

        const postLoginResponse = await this.request.post('https://api.practicesoftwaretesting.com/users/login', { data: payload })
        return postLoginResponse;
    }

    async postRegisterResponse(payload) {
        const postRegisterResponse = await this.request.post('https://api.practicesoftwaretesting.com/users/register', { data: payload })
        return postRegisterResponse;
    }
}

module.exports = { API_utils };