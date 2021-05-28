import React from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { Users } from '../Screens/Users';
import { Todos } from '../Screens/Todos';

const App = (): React.ReactElement => {
    return (
        <Router basename={'/'}>
            <Switch>
                <Route path={'/users'} component={Users} />
                <Route path={'/todos'} component={Todos} />
                <Redirect to={'/users'} />
            </Switch>
        </Router>
    );
};

export default App;
