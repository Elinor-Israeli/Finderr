import { useEffect, useState, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

import { addGig } from '../../store/actions/gig.actions'
import { updateGig } from '../../store/actions/gig.actions'

import { ImgUploader } from '../ImgUploader' 

import { gigService } from '../../services/gig/gig.service.remote'
import { userService } from '../../services/user/user.service.remote'  

export function GigEdit() {
    const navigate = useNavigate()
    const { gigId } = useParams()
    const [gigToEdit, setGigToEdit] = useState(gigService.getEmptyGig())
    const [,setImgToEdit] = useState()
    const gigForFormik = { ...gigToEdit, tags2: '' }
    const loginUser = userService.getLoggedinUser()

    const loadGig = useCallback(async () => {
        const gig = await gigService.getById(gigId)
        setGigToEdit(gig)
    }, [gigId])

    useEffect(() => {
        if (!gigId) return
        loadGig()
    }, [gigId, loadGig])

    const GigSchema = Yup.object().shape({
        title: Yup.string()
            .min(2, 'Too Short!')
            .required('Required'),
        description: Yup.string()
            .min(2, 'Too Short!')
            .required('Required'),
        price: Yup.number().min(1, 'minimum 1$').required('Required'),
        daysToMake: Yup.string()
            .required('Required'),
    })

    function onUploaded(data) {
        gigToEdit.imgUrl.push(data)
        setImgToEdit((prevImg) => ({ ...prevImg, data }))
    }

    const onSave = async () => {
        try {
            if (gigId){
                await updateGig(gigToEdit)
            } else {
                await addGig(gigToEdit) 
            }
            navigate(`/user/${loginUser._id}`)
        } catch (err) {
            console.log('Cannot save gig: ', err)
        }
    }

    const tags = [
        { value: "", name: "Select an option", key: 1 },
        { value: "graphic-design", name: "Graphic & design", key: 2 },
        { value: "digital-marketing", name: "Digital Marketing", key: 3 },
        { value: "writing-translation", name: "Writing & Translation", key: 4 },
        { value: "video-animation", name: "Video & Animation", key: 5 },
        { value: "music-audio", name: "Music & Audio", key: 6 },
        { value: "programming-Tech", name: "Programming & Tech", key: 7 },
        { value: "business", name: "Business", key: 8 },
        { value: "lifestyle", name: "Lifestyle", key: 9 },
        { value: "data", name: "Data", key: 10 },
        { value: "photography", name: "Photography", key: 11 },
    ]

    function updateTags(tag) {
        const oldTags = gigToEdit.tags
        const newTags = (tag.target.name === "tags") ? [tag.target.value, oldTags[1]] : [oldTags[0], tag.target.value]
        gigToEdit.tags = newTags
    }

    return (
        <Formik
            initialValues={gigForFormik}
            validationSchema={GigSchema}
            onSubmit={onSave}
            enableReinitialize
        >
            {({ errors, touched, setFieldValue }) => {
                return (
                    <Form className='gig-edit-form'>
                        <div className='gig-edit-form-wrapper'>
                            <div className="gig-form-title">
                                <label htmlFor="title">Gig title</label>
                                <Field type="text" id="title" name="title" placeholder="I will..." onChange={(e) => {
                                    gigToEdit.title = e.target.value
                                    setFieldValue("title", e.target.value)
                                }} ></Field>
                                {errors.title && touched.title ? <div>{errors.title}</div> : null}
                            </div>

                            <div className="gig-form-description">
                                <label htmlFor="description">Gig description</label>
                                <Field as="textarea" type="text" id="description" name="description" onChange={(e) => {
                                    gigToEdit.description = e.target.value
                                    setFieldValue("description", e.target.value)
                                }} ></Field>
                                {errors.description && touched.description ? <div>{errors.description}</div> : null}
                            </div>

                            <div className="gig-form-category">
                                <label htmlFor="tags">Category</label>
                                <div className="gig-form-category1">
                                    <Field as={Select} name='tags' value={gigToEdit.tags[0] || ''} onChange={(e) => {
                                        updateTags(e)
                                        setFieldValue("tags", e.target.value)
                                    }} >
                                        {tags.map((tag) => (
                                            <MenuItem key={tag.key} value={tag.value}>
                                                {tag.name}
                                            </MenuItem>))}
                                    </Field>
                                    {errors.tags ? <div>{errors.tags}</div> : null}
                                </div>

                                <div className="gig-form-category2">
                                    <Field as={Select} name='tags2' value={gigToEdit.tags[1] || ''} onChange={(e) => {
                                        updateTags(e)
                                        setFieldValue("tags", e.target.value)
                                    }} >
                                        {tags.map((tag) => (
                                            <MenuItem key={tag.key + '1'} value={tag.value}>
                                                {tag.name}
                                            </MenuItem>))}
                                    </Field>
                                    {errors.tags2 ? <div>{errors.tags2}</div> : null}
                                </div>
                            </div >

                            <div className="gig-form-inputs">
                                <div className="gig-form-price">
                                    <label htmlFor="price">Price</label>
                                    <Field name="price" id="price" label="price" onChange={(e) => {
                                        gigToEdit.price = +e.target.value
                                        setFieldValue("price", +e.target.value)
                                    }} ></Field>
                                    {errors.price && touched.price ? <div>{errors.price}</div> : null}
                                </div>

                                <div className="gig-form-days">
                                    <label htmlFor="daysToMake">Days to make</label>
                                    <Field as={Select} name='daysToMake' onChange={(e) => {
                                        gigToEdit.daysToMake = +e.target.value
                                        setFieldValue("daysToMake", +e.target.value)
                                    }}>
                                        <MenuItem value='1'>Express</MenuItem>
                                        <MenuItem value='3'>Up to 3 days</MenuItem>
                                        <MenuItem value='7'>Up to 7 days</MenuItem>
                                    </Field>
                                    {errors.daysToMake && touched.daysToMake ? <div>Please select an option</div> : null}
                                </div>
                            </div>
                            <ImgUploader onUploaded={onUploaded} />
                            {gigToEdit.imgUrl && <ul className="upload-img-list">{gigToEdit.imgUrl.map((img, index) => <li key={index} className="upload-img-gig"><img src={img} /></li>)}</ul>}
                        </div >
                        <div className="gig-edit-btn-wrapper">
                            <Button variant='contained' type='submit'>Submit</Button>
                        </div>
                    </Form >
                )
            }}
        </Formik >
    )
}