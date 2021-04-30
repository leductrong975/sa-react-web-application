import React, { useState } from 'react';
import './CreateCampaign.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import app, { auth, storage } from '../../firebase';
import { v4 as uuidv4 } from "uuid";
import { useHistory } from 'react-router-dom';

function CreateCampaign() {
  const db = app.firestore();
  const [article, setArticle] = useState({
    title: '',
    content: '',
    createDate: new Date(),
    featureImage: '',
    isPublish: false,
    lastModified: new Date(),
    hasFeatureImage: false,
    createUserID: auth.currentUser.uid,
  });
  const history = useHistory();

  const modules = {
    toolbar: {
      container: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean'], ['code-block'],
      ],
    },
    clipboard: {
      matchVisual: false,
    },
  }

  const formats = [
    'header', 'font', 'size', 'bold', 'italic',
    'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent', 'link',
    'image', 'video', 'code-block',
  ];

  const onChangeCampaignTitle = (title) => {
    setArticle({
      ...article,
      title: title
    });
  }

  const onChangeCampaignContent = (content) => {
    setArticle({
      ...article,
      content: content
    });
  }

  const onClickPublish = async () => {
    await db.collection("Articles").add(article);
    history.push('/your-campaigns');

  }

  const uploadImageCallBack = (e) => {
    return new Promise(async (resolve, reject) => {
      const file = e.target.files[0];
      const fileName = uuidv4();
      await storage.ref().child("Articles/" + fileName).put(file);
      const downloadURL = await storage.ref().child("Articles/" + fileName).getDownloadURL();
      console.log(downloadURL);
      resolve({
        success: true,
        data: { link: downloadURL }
      });
    });
  }

  return (
    <>
      <div className='AuthContainer'>
        <h1>Create New Campaign</h1>
        <form className='AuthForm'>
          <div className='InputFieldContainer'>
            <label className='InputLabel'>Title</label>
            <input className='Field'
              type='text'
              name='articleTitle'
              id='articleTitle'
              placeholder='Title'
              required
              onChange={(e) => onChangeCampaignTitle(e.target.value)}
              value={article.title}
            />
            <label className='InputLabel'>Feature Image</label>
            <input
              type='file'
              accept='image/*'
              onChange={async (e) => {
                const uploadState = await uploadImageCallBack(e)
                if (uploadState.success) {
                  setArticle({
                    ...article,
                    featureImage: uploadState.data.link,
                    hasFeatureImage: true,
                  });
                }
              }}
            />
            {article.hasFeatureImage ?
              <img src={article.featureImage} alt="Campaign" className="FeatureImg" /> : ''
            }
            <ReactQuill
              value={article.content}
              onChange={(e) => onChangeCampaignContent(e)}
              modules={modules}
              formats={formats}
            />
          </div>
        </form>
        <div className='InputFieldContainer'>
          <button buttonstyle='btn--primary' onClick={onClickPublish}>
            Create New Campaign
          </button>
        </div>
      </div>
    </>
  );
}

export default CreateCampaign;






// const fileCompress = (file) => {
  //   return new Promise(async (resolve, reject) => {
  //     new Compressor(file, {
  //       file: 'File',
  //       quality: 0.5,
  //       maxWidth: 1280,
  //       maxHeight: 1280,
  //       width: 1280,
  //       height: 1280,
  //       success(result) {
  //         return resolve({
  //           success: true,
  //           file: result
  //         })
  //       },
  //       error(err) {
  //         return resolve({
  //           success: false,
  //           message: err.message
  //         })
  //       },
  //     })
  //   })
  // }

  // const imageThumbnailCompress = (file) => {
  //   return new Promise(async (resolve, reject) => {
  //     new Compressor(file, {
  //       file: 'File',
  //       quality: 0.95,
  //       maxWidth: 450,
  //       maxHeight: 450,
  //       width: 450,
  //       height: 450,
  //       success(result) {
  //         return resolve({
  //           success: true,
  //           file: result
  //         })
  //       },
  //       error(err) {
  //         return resolve({
  //           success: false,
  //           message: err.message
  //         })
  //       },
  //     })
  //   })
  // }
