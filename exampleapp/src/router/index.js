export const asyncRouterPage = (name, path = 'pages') => {
    let pageComponent = `${name}Page`
    pageComponent = resolve => {
      import(`@/${path}/${name}`).then(module => {
        resolve(module)
      })
    }
    return pageComponent
  }