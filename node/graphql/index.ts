import {Apps} from '@vtex/api'

const getCheckoutMajor = () => {
  return parseInt(process.env.VTEX_APP_VERSION.split('.')[0], 10)
}

const getCheckoutAppId = () => {
  return `vtex.checkout@${getCheckoutMajor()}.x`
}

export const resolvers = {
  Query: {
    getSettings: (_, {app, version}, ctx) => {
      const apps = new Apps(ctx.vtex)
      const filter = getCheckoutAppId()
      return apps.getAppSettings(filter).then((r) => (r))
    }
  },
  Mutation: {
    saveSettings: (_, {app, version, settings}, ctx) => {
      const apps = new Apps(ctx.vtex)
      const filter = getCheckoutAppId()
      return apps.saveAppSettings(filter, settings).then((r) => (r))
    }
  }
}
