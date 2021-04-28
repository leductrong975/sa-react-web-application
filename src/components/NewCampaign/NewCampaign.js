import React, {Component} from 'react';
import './NewCampaign.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import app, { auth } from '../../firebase';
// import classes from '*.module.css';

const db = app.firestore();
class NewCampaign extends Component{
    constructor(props) {
        super(props);
        this.state={
            article:{
                title:'',
                content:'',
                createDate: new Date(),
                featureImage: '',
                isPublish: false,
                lastModified: new Date(),
                createUserID: '',
            }
        }
    }

    modules = {
        toolbar: {
            container: [
                [{'header': '1'}, {'header': '2'}, {'font': []}],
                [{size: []}],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                ['link', 'image'],
                ['clean'], ['code-block'],
            ],
        },
        clipboard: {
            matchVisual: false,
        },
    }
    
    const
    formats = [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'video',
        'code-block',
    ]

    onChangeCampaignTitle = (value) => {
        this.setState({
            article: {
                ...this.state.article,
                title:value
            }
        })
    }

    onChangeCampaignContent = (value) => {
        this.setState({
            article: {
                ...this.state.article,
                content:value
            }
        })
    }

    onClickPublish = (value) => {
        const article = this.state.article;
        article.createUserID = auth.currentUser.uid;
        console.log(article);
        this.setState({
            article: {
                ...this.state.article,
                isPublish: false
            }
        })

        db.collection("Articles")
            .add(article).then(res => {
                console.log(res)
            })
            .catch(err => console.log(err))
    }
    // function handleSubmit(e) {
    //     setCampaign({title: titleRef.current.value, content: contentRef.current.value});
    //     console.log(campaign);
    // }
    uploadImageCallBack = (e) => {
        return new Promise(async (resolve, reject) => {
            const file = e.target.files[0]
                
        })
    }

    render () {
        return (
            <>
                <div className='AuthContainer'>
                    <h1>New Campaign</h1>
                    {/* <form className='AuthForm' onSubmit={handleSubmit}> */}
                    <form className='AuthForm'>
                        <div className='InputFieldContainer'>
                            <label className='InputLabel'>Title</label>
                            <input className='Field' 
                                type='text' 
                                name='articleTitle'
                                id='articleTitle'
                                placeholder='Title' 
                                required
                                onChange={(e) => this.onChangeCampaignTitle(e.target.value)}
                                value={this.state.article.title}
                            />
                            <label className='InputLabel'>Feature Image</label>
                            <input 
                                type='file' 
                                accept='image/*' 
                                // className={classes.ImageUploader}
                                onChange={async (e) => {
                                    const uploadState = await this.uploadImageCallBack(e)
                                    if (uploadState.success) {
                                        this.setState({
                                            hasFeatureImage: true,
                                            article: {
                                                ...this.state.article,
                                                featureImage: uploadState.data.link
                                            }
                                        })
                                    }
                                }}
                            />
                            <ReactQuill 
                                ref={(el) => this.quill = el}
                                value={this.state.article.content} 
                                onChange={(e) => this.onChangeCampaignContent(e) }
                                modules={this.modules} 
                                formats={this.formats}
                            />
                        </div>
                    </form>
                    <div className='InputFieldContainer'>
                        <button buttonstyle='btn--primary' onClick={(e) => this.onClickPublish()}>Create New Campaign</button>
                        
                    </div>
                </div>
            </>
        )
    };
}

export default NewCampaign;