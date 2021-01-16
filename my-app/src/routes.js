import { Switch, Route, Redirect } from "react-router-dom"
import {Chat} from "./pages/Chat"
import { Auth } from "./pages/Auth"
import { PrivateChat } from "./pages/PrivateChat"
import { PrivateMessages } from "./components/PrivateMessages"
import { ResetPage } from "./pages/ResetPage"
import { NewEmail } from "./pages/NewEmail"

export const useRoutes = (token) => {
    if (token){
        return (
            <Switch>
                <Route path='/system-chat' exact>
                    <Chat/>
                </Route>
                <Route path='/chat/:id'>
                    <PrivateChat/>
                </Route>
                <Route path='/chat' exact>
                    <PrivateMessages/>
                </Route>
                <Redirect to='/system-chat'/>
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path='/' exact>
                <Auth/>
            </Route>
            <Route path='/reset' exact>
                <ResetPage/>
            </Route>
            <Route path='/reset/:token' exact>
                <NewEmail/>
            </Route>

            <Redirect to='/'/>
        </Switch>
    )
}