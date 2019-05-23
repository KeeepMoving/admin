export default {
    api: {
        getSystemSettings: "/aas/api/v1/getSystemSettings",
        getSystemStatuss: "/aas/api/v1/getSystemStatus",
        switchSystemStatus: "/aas/api/v1/switchSystemStatus",
        updateSystemSettings: "/aas/api/v1/updateSystemSettings",
        getOrders: "/aas/api/v1/getOrders",
        getFailedRequests: "/aas/api/v1/getFailedRequests",
        getTrades: "/aas/api/v1/getTrades",
        getReports: "/aas/api/v1/getReports",
        getEarningReports: "/aas/api/v1/getEarningReports",
        getOrderReports: "/aas/api/v1/getOrderReports",
        getContractReports: "/aas/api/v1/getContractReports",
    },
    page: {
        pageSize: 15
    }
}