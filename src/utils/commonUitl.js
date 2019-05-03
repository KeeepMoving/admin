const S4 =() => {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
};

const getUuid = () => {
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
};

const getOrderStatus = (status) => {
    if (status === "PENDING") {
        return "待成交";
    }
    if (status === "CANCELED") {
        return "已撤单";
    }
    if (status === "FILLED") {
        return "已成交";
    }
    if (status === "PARTIAL_FILLED") {
        return "部分成交";
    }
    return status;
};

const getFormattedDateString = (timestamp) => {
    if (timestamp) {
        return new Date(timestamp).format("yyyy-MM-dd hh:mm:ss");
    } else {
        return null;
    }
};
export {
    getUuid,
    getOrderStatus,
    getFormattedDateString
}
