import React ,{useEffect, Fragment}from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {getCurrentProfile, deleteAccount} from '../../actions/profile'
import Spinner from '../layouts/Spinner'
import { Link } from 'react-router-dom'
import DashBoardActions from './DashBoardActions'
import Experience from './Experience'
import Education from './Education'

const Dashboard = ({getCurrentProfile ,auth: {user}, profile : { profile , loading},
    deleteAccount
}) => {
    useEffect(() =>{
        getCurrentProfile()
    },[getCurrentProfile])

    return loading && profile === null ? <Spinner/> : <Fragment> 
        <h1 className = "large text-primary">DashBoard</h1>
        <p className = "lead">
        <i className = "fas fa-user">Welcome {user && user.name}</i>
        </p>
        { profile !== null ? (<Fragment>
            <DashBoardActions/>
            <Experience experience={profile.experience}/>
            <Education education={profile.education}/>
            <div className="my-2">
                <button className="btn btn-danger" onClick={()=>deleteAccount()}>
                    <i className="fas fa-user-minus">Delete My Account</i>
                </button>
            </div>
        </Fragment>) : (<Fragment>
            <p>You have not yet setup Profile, please add some info</p>
            <Link to= '/create-profile' className = "btn btn-primary my-1">
                Create Profile</Link></Fragment>)}
    </Fragment>
}

Dashboard.propTypes = {
    getCurrentProfile:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    profile:PropTypes.object.isRequired,
    deleteAccount:PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth : state.auth,
    profile: state.profile
})

export default connect(mapStateToProps,{getCurrentProfile , deleteAccount})(Dashboard)