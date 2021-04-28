import React, {Component} from 'react';
import './NewCampaign.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { auth } from '../../firebase';
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
        article.createUserID = this.props.auth.uid;
        console.log(article);
        this.setState({
            article: {
                ...this.state.article,
                isPublish: false
            }
        })
    }
    // function handleSubmit(e) {
    //     setCampaign({title: titleRef.current.value, content: contentRef.current.value});
    //     console.log(campaign);
    // }
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