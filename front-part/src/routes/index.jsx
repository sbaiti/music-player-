import React from 'react';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import loadableComponents from './loadableComponents'

const Routes = loadableComponents.map((route, i) => {
    const { path, component, exact } = route
    return (
        <Route
            key={i}
            component={component}
            path={path}
            exact={exact}
        />
    )
})

export default Routes;