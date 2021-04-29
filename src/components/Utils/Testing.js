import React, {useState, useRef, useEffect} from 'react'
import ReactQuill from "react-quill";
import {v4 as uuidv4} from "uuid";
import Compressor from "compressorjs";
import ReactQuillEditorCss from './Testing.module.css';
import app from "../../firebase";
import {Trans} from "react-i18next";
import appRef from "../../firebase";
import {withRouter} from "react-router-dom";
import 'firebase/firestore';
import 'firebase/storage';

const db = appRef.firestore()
const Testing = (props) => {
    let quillRef = useRef();
    const [newArticle, setNewArticle] = useState({
        id: uuidv4(),
        title: '',
        titleCHI: '',
        content: '',
        contentCHI: '',
        featureImage: '',
        thumbnailImage: '',
        publishDate: new Date(1111, 11, 11),
        canonicalUrl: "",
        isPublish: false,
        isNew: true,
    })
    const [hasFeatureImage, setHasFeatureImage] = useState(false)
    const [isImageUploading, setIsImageUploading] = useState(false)
    const [isSubmitting,setIsSubmitting] = useState(false)

    useEffect(() => {
        if(typeof props.match.params.aid !== 'undefined'){
            setNewArticle({
                ...props.location.state.article,
                isNew: false
            })

            setHasFeatureImage(false)
            setTimeout(() => setHasFeatureImage(true), 200)
        }
    },[props.location.state])

    const modules = React.useMemo(
        () => ({
            toolbar: {
                container: [[{'header': [1, 2, false]}],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                    ['link', 'image'],
                    ['clean'], ['code-block']
                ],
                // handlers: {
                //     'image': () => quillImageCallBack()
                // },
                clipboard: {
                    matchVisual: false
                }
            }
        })
    )

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ]


    // const quillImageCallBack = () => {
    //     const input = document.createElement('input')
    //     input.setAttribute('type', 'file')
    //     input.setAttribute('accept', 'image/*')
    //     input.click()
    //     input.onchange = async () => {
    //         const file = input.files[0]
    //         const fileName = uuidv4()
    //         storageRef.ref().child('Article/' + fileName).put(file)
    //             .then(async snapshot => {
    //                 const downloadURL = await storageRef.ref().child('Article/' + fileName).getDownloadURL()
    //                 let quill = quillRef.getEditor()
    //                 const range = quill.getSelection(true)
    //                 quill.insertEmbed(range.index, 'image', downloadURL)
    //             })
    //
    //     }
    // }

    const fileCompress = (file) => {
        return new Promise(async (resolve, reject) => {
            new Compressor(file, {
                file: 'File',
                quality: 0.5,
                maxWidth: 1280,
                maxHeight: 1280,
                width: 1280,
                height: 1280,
                success(result) {
                    return resolve({
                        success: true,
                        file: result
                    })
                },
                error(err) {
                    return resolve({
                        success: false,
                        message: err.message
                    })
                },
            })
        })
    }

    const imageThumbnailCompress = (file) => {
        return new Promise(async (resolve, reject) => {
            new Compressor(file, {
                file: 'File',
                quality: 0.95,
                maxWidth: 450,
                maxHeight: 450,
                width: 450,
                height: 450,
                success(result) {
                    return resolve({
                        success: true,
                        file: result
                    })
                },
                error(err) {
                    return resolve({
                        success: false,
                        message: err.message
                    })
                },
            })
        })
    }

    const uploadImageCallBack = async (e) => {
        return new Promise(async (resolve, reject) => {
            setIsImageUploading(true)
            const file = e.target.files[0];
            const compressState = await fileCompress(file)
            const compressThumbnailState = await imageThumbnailCompress(file)
            if (compressState.success && compressThumbnailState.success) {

                const randomFileName = uuidv4()

                // const uploadState = await new Promise(async (resolve1, reject) => {
                const path = '/ArticleImage/' + newArticle.id + '/'

                const uploadFeatureImage = await new Promise(async (resolve1, reject1) => {
                    app.storage()
                        .ref()
                        .child(path + randomFileName)
                        .put(compressState.file)
                        .then(async function (snapshot) {

                            const downloadURL = await app
                                .storage()
                                .ref()
                                .child(path + randomFileName)
                                .getDownloadURL();

                            const res = {
                                data: {link: downloadURL},
                                status: 200,
                                success: true
                            }
                            resolve1(res)
                        })
                        .catch(e => reject(e));
                })

                const uploadThumbnailImage = await new Promise(async (resolve1, reject1) => {
                    app.storage()
                        .ref()
                        .child(path + randomFileName + '_thumbnail')
                        .put(compressThumbnailState.file)
                        .then(async function (snapshot) {

                            const downloadURL = await app
                                .storage()
                                .ref()
                                .child(path + randomFileName + '_thumbnail')
                                .getDownloadURL();

                            const res = {
                                data: {link: downloadURL},
                                status: 200,
                                success: true
                            }
                            resolve1(res)
                        })
                        .catch(e => reject(e));
                })

                // })
                if (uploadFeatureImage.success && uploadThumbnailImage.success) {
                    setIsImageUploading(false)
                    resolve({
                        success: true,
                        featureImage: uploadFeatureImage.data.link,
                        thumbnailImage: uploadThumbnailImage.data.link
                    })
                }
            }

        })
    }

    const saveArticle = () => {
        setIsSubmitting(true)
        let id = newArticle.id
        let a = {...newArticle}
        delete a.id
        // set publish date
        if (a.isPublish && a.toISOString() === new Date(1111, 11, 11).toISOString()) {
            a.publishDate = new Date()
        }

        if (newArticle.isNew) {
            db.collection('Article')
                .doc(id)
                .set({
                    ...a,
                    createDate: new Date(),
                    lastModified: new Date(),
                })
                .then(res => {
                    setNewArticle({
                        ...newArticle,
                        isNew: false
                    })
                    setTimeout(() => setIsSubmitting(false) , 100)
                })
                .catch(err => console.log(err))
        } else {
            db.collection('Article')
                .doc(id)
                .update({
                    ...a,
                    lastModified: new Date(),
                })
                .then(res => {
                    setTimeout(() => setIsSubmitting(false) , 100)
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <div className="AuthContainer">
            <h1>Create A New Campaign</h1>
            <div className="InputFieldContainer">
                {
                    (newArticle.featureImage !== '' && hasFeatureImage) ?
                        <img src={newArticle.featureImage} className="w-full rounded-2xl object-cover h-64" alt=""
                             style={{height: "24em"}}/>
                        :
                        <div className="w-full rounded-2xl object-cover bg-gray-100"
                             style={{height: "24em"}}
                        >
                        </div>
                }
            </div>
            <div className="flex">
                <div>
                    <input type="file"
                           accept="image/*"
                           className=""
                           onChange={async (e) => {
                               const uploadState = await uploadImageCallBack(e)
                               if (uploadState.success) {
                                   setHasFeatureImage(false)

                                   setNewArticle({
                                       ...newArticle,
                                       featureImage: uploadState.featureImage,
                                       thumbnailImage: uploadState.thumbnailImage
                                   })
                                   setTimeout(() => setHasFeatureImage(true), 200)
                               }
                           }}/>
                </div>

            </div>
            <div className="my-4">
                <input type='text' name='articleTitle' id='articleTitle' placeholder='title'
                       className="w-full rounded border-gray-200 h-12 p-2"
                       style={{borderWidth: "1px"}}
                       onChange={(e) => {
                           setNewArticle({
                               ...newArticle,
                               ["title"]: e.target.value
                           })
                       }}
                       value={newArticle.title}
                />
            </div>
            <div className={["my-4", ReactQuillEditorCss.ReactQuillEditor].join(" ")}
                 style={{minHeight: "400px", maxHeight: "600px", overflow:"hidden"}}
            >
                    <ReactQuill
                        // ref={(el) => quillRef = el}
                        defaultValue={newArticle.content}
                        onChange={(e) => {
                            setNewArticle({
                                ...newArticle,
                                ["content"]: e
                            })
                        }}
                        theme='snow'
                        modules={modules}
                        formats={formats}
                    />
            </div>

            <div className="flex">
                <div className="flex-1">
                    <label>
                        <Trans>NewArticle.is-published</Trans>
                    </label>
                    <select className="w-24 rounded bg-gray-100 mx-4 p-2"
                            onChange={(e) => {
                                setNewArticle({
                                    ...newArticle,
                                    isPublish: e.target.value === "true"
                                })
                            }}
                    >
                        <option selected={newArticle.isPublish}>
                            true
                        </option>
                        <option  selected={!newArticle.isPublish}>
                            false
                        </option>
                    </select>
                </div>
                <div className="float-right">
                    <button className={["rounded  px-4 py-2", isSubmitting ? "bg-green-200 text-green-900" : "bg-red-200 text-red-900"].join(" ")}
                            disabled={isSubmitting}
                            onClick={() => {
                                saveArticle()
                            }}
                    >
                        {isSubmitting ?  <Trans>NewArticle.is-submitting</Trans> :  <Trans>NewArticle.save</Trans> }
                    </button>
                </div>

            </div>
        </div>
    )
}
export default withRouter(Testing)