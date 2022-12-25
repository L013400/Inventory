const tables = {
    'ON-PREM' : 'ENV_TABLE',
    'MDM': 'MDM_TABLE',
    'IICS': 'IOD_TABLE'
}

const tableColumns = {
    'ON-PREM': 'ID, DOMAIN_NAME, HOST_NAME, GW_PORT, DOMAIN_DB_INSTANCE, REPOSITORY_DB_ACCOUNT, SYSTEM_CUSTODIAN, SERVER_OWNER, PRIMARY_IT_CONTACT, COST_CENTER,VALUE',
    'MDM':'*',
    'IICS':'ID, BUSINESS_AREA, ENV, ORGANIZATION_ID, ORGANIZATION_NAME, VANITY_URL'
}

// const tableColumns = {
//     'ON-PREM': '*',
//     'MDM':'*',
//     'IICS':'*'
// }
export const queryToGetInventoryData = (type) => `
    SELECT ${tableColumns[type]} FROM ${tables[type]}
`

export const queryToUpdateInventory = (type, data, ID) => {
    const updates = Object.keys(data).map((key)=> `${key} = '${data[key]}'`).join(',')
    return `
    UPDATE ${tables[type]} SET ${updates} WHERE ID='${ID}'
    `
}