const createResp = (data, statusCode) => {
    return {
        body: { data: { ...data } },
        status: statusCode,
    }
}

const createErrorResp = (data, statusCode) => {
    return {
        body: { error: { ...data } },
        status: statusCode,
    }
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
}
