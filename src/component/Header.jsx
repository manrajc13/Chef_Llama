import chef_icon from "./chef_icon.png"
import { Fragment } from "react"

export default function Header() {
    return (
        <Fragment>
            <header>
                <img src={chef_icon} alt="chef-robot"/>
                <h3>Chef Claude</h3>
            </header>
            <hr />
        </Fragment>
    )
}