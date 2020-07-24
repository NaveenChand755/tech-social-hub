import React ,{useEffect, Fragment}from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../layouts/Spinner'
import PostItem from '../posts/PostItem'
import CommentForm from '../post/CommentForm'
import CommentItem from './CommentItem'
import {getPost} from '../../actions/post'


const Post = ({getPost,
post:{post,loading},match}) => {
    useEffect(()=>{
        getPost(match.params.id)
    },[getPost,match.params.id])
    return  loading || post === null ? <Spinner></Spinner> : <Fragment>
        <PostItem post={post} showActions={false}></PostItem>
        <CommentForm postId={post._id}></CommentForm>
        <div className="comments">
            {post.comments.map(comment =>(
              <CommentItem key={comment._id} comment={comment} postId={post._id}></CommentItem>  
            ))}
        </div>
    </Fragment>
}

Post.propTypes = {
getPost:PropTypes.func.isRequired,
post:PropTypes.object.isRequired,
}

const mapStateToProps = state=>({
    post:state.post
})

export default connect(mapStateToProps,{getPost})(Post)
