	"use strict";
	import React, {Component} from "react";
	import {connect} from "react-redux";
	import moment from 'moment'
	import Select from 'react-select'
	import {Link} from 'react-router'

	import DeletePosts from '../actions/DeletePosts'
	import AddMarkAndComment from '../actions/AddMarkAndComment'
	import AddPost from '../actions/AddPost'

	class Posts extends Component {
		constructor(props){
			super(props)
			this.createNewPost=this.createNewPost.bind(this)
			this.changeValueNewPost=this.changeValueNewPost.bind(this)
			this.addNewPost=this.addNewPost.bind(this)
			this.changeUserForPost=this.changeUserForPost.bind(this)
			this.changeCommentForPost=this.changeCommentForPost.bind(this)
			this.changeMarkForPost=this.changeMarkForPost.bind(this)
			this.SaveCommentAndMarkForPost=this.SaveCommentAndMarkForPost.bind(this)
			this.AddMarkAndComment=this.AddMarkAndComment.bind(this)
			this.deletePosts=this.deletePosts.bind(this)


			this.state={
				dropDown:false,
				valueNewPost:'',
				userForNewPost:'',
				markForPost:'',
				commentForPost:'',
				isWritingCommentWithMark:false,
				idActivePost:null,
				errors:false,
				errorsInComments:false
			}
		}
		changeValueNewPost(e){
				this.setState({valueNewPost:e.target.value})
		}
		changeUserForPost(e){
				this.setState({userForNewPost:e.target.value})
		}
		changeCommentForPost(e){
			this.setState({commentForPost:e.target.value})
		}
		changeMarkForPost(e){
			this.setState({markForPost:e})			
		}
		addNewPost(){
			if(this.state.valueNewPost.length>3&&this.state.userForNewPost.length>3){
				this.props.dispatch(AddPost({
					user:this.state.userForNewPost,
					post:this.state.valueNewPost,
					id:Math.random(),
					comments:[]
				}))
			this.setState({
				dropDown:false,
				valueNewPost:'',
				userForNewPost:'',
				errors:false})
			}else{
				this.setState({errors:true})
			}
		}
		createNewPost(){
			if(this.state.dropDown===false){
				this.setState({dropDown:true})
			}else{
				this.setState({dropDown:false})

			}
		}

		deletePosts(){
			this.props.dispatch(DeletePosts())
		}
		AddMarkAndComment(e){
			this.setState({isWritingCommentWithMark:true,
							idActivePost:e,	
							})

		}
		SaveCommentAndMarkForPost(){
			if(this.state.commentForPost.length>2&&this.state.markForPost){
				this.props.dispatch(AddMarkAndComment({id:this.state.idActivePost,
														markAndComment:{
															comment:this.state.commentForPost,
															mark:this.state.markForPost.value
														}
														}))
				this.setState({
					isWritingCommentWithMark:false,
					idActivePost:null,
					commentForPost:'',
					markForPost:'',
					errorsInComments:false
				})
			}else{
				this.setState({errorsInComments:true})
			}
		}

		render() {
			let dropDown,errorsInForm,errorsInComments
			if(this.state.dropDown){
					dropDown=<div className="new-post">

					
										<input type="text" className="new-post__input"
										 onChange={this.changeUserForPost}
										  placeholder="Введите имя"
										  value={this.state.userForNewPost}/>
										<input type="text" className="new-post__input"
										 onChange={this.changeValueNewPost}
										  placeholder="Введите пост"
										  value={this.state.valueNewPost}/>
	        									<button className="new-post__button"
	        									 onClick={this.addNewPost} type="button">Сохранить!</button>
	      							
							</div>
			}else{
				dropDown=null
			}
			if(this.state.errors){
				errorsInForm=<div className="all-data__errors"><h3>Введите корректно данные</h3></div>
			}else{
				errorsInForm=null
			}
			if(this.state.errorsInComments){
				errorsInComments=<div className="all-posts__errors"><h3>Введите корректно данные</h3></div>
			}else{
				errorsInComments=null
			}
			let options=[{label:1,value:1},{label:2,value:2},{label:3,value:3},{label:4,value:4},{label:5,value:5}]
			return <div className="container">
						<div className='all-data'>
							<div className="all-data__main">

									<button className="all-data__main--button-save" onClick={this.createNewPost}>
									Создать новый пост</button>
									<button className="all-data__main--button-delete" onClick={this.deletePosts}>Удалить все посты</button>
							</div>
						{errorsInForm}
						{dropDown}
						{this.props.Posts.data!==0?
							<div className='all-possts'>

										{this.props.Posts.data.map((post,key)=>{
											if(this.state.isWritingCommentWithMark&&this.state.idActivePost===post.id){
											return <div  key={key}>
														<div className='all-posts__show'>
														<p className='all-posts__show--user'>Пользователь: {post.user}</p>
														<p className='all-posts__show--post'>{post.post}</p>
														 </div>
														 {post.comments.length!==0?post.comments.map((item,key)=>{
															return <div className="all-posts__comment" key={key}>
															<p className="all-posts__comment--data">Оценка: {item.mark}</p>
															<p className="all-posts__comment--data">Комментарий: {item.comment}</p>
															</div>}):null}
																{errorsInComments}
														 <div className='all-posts__edit'>
														 	<Select
														 	className="all-posts__edit--select"
														 	placeholder="Выберите оценку посту"
														 	options={options}
														 	onChange={this.changeMarkForPost}
														 	value={this.state.markForPost}
														 	/>

														 	<input 
														 	placeholder="Введите комментарий"
														 	className="all-posts__edit--input"
														 	onChange={this.changeCommentForPost}
														 	value={this.state.commentForPost}/>
														 	<button 
														 	className="all-posts__edit--button"
														 	onClick={this.SaveCommentAndMarkForPost}
														 	>Сохранить</button>
														 	</div>
													</div>	
											}else{


											return <div key={key}><div className='all-posts__show' >
														<p className="all-posts__show--user">Пользователь: {post.user}</p>
														<p className="all-posts__show--post">{post.post}</p>
														</div>

														{post.comments.length!==0?post.comments.map((item,key)=>{
															return <div className="all-posts__comment" key={key}>
															<p className="all-posts__comment--data">Оценка: {item.mark}</p>
															<p className="all-posts__comment--data">Комментарий: {item.comment}</p>
															</div>}):null}
														<div className="all-posts__appraise"><button
														className="all-posts__appraise--button"
														 onClick={this.AddMarkAndComment.bind(this,post.id)}
														 >Оценить</button></div>
													</div>
											}
											
										})}

										</div>:null}
						</div>
					</div>

		}
	}

	export default connect(store => store)(Posts);