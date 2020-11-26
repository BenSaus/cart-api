const createResp = (data, statusCode) => {
    return {
        body: { data: { ...data } },
        status: statusCode,
    }
}

const createErrorResp = (errorArray, statusCode) => {
    return {
        body: { errors: errorArray },
        status: statusCode,
    }
}

const createInternalServerError = () => {
    return createErrorResp({ message: "Internal Server Error" }, 500)
}

const createEmptyResp = (statusCode) => {
    return {
        body: {},
        status: statusCode,
    }
}

module.exports = {
    createResp,
    createErrorResp,
    createEmptyResp,
    createInternalServerError,
}
