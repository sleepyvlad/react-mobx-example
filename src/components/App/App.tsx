import React from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { Users } from '../Screens/Users';
import { Todos } from '../Screens/Todos';
import { UserInfo } from '../Screens/UserInfo';
import { RootStoreProvider } from '../../store/RootStore';

const App = (): React.ReactElement => {
    return (
        <RootStoreProvider>
            <Router basename={'/'}>
                <Switch>
                    <Route path={'/users'} component={Users} />
                    <Route path={'/todos'} component={Todos} />
                    <Route path={'/user-info/:id'} component={UserInfo} />
                    <Redirect to={'/users'} />
                </Switch>
            </Router>
        </RootStoreProvider>
    );
};

export default App;
