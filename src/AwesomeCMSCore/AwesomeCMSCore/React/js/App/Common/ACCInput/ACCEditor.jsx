import React from 'react'
import PropTypes from 'prop-types'
import {Editor} from '@tinymce/tinymce-react';
import {APP_CONFIG} from './../../Helper/Config';

const ACCEditor = (props) => {
    return (<Editor
        apiKey={APP_CONFIG.EDITOR_API_KEY}
        initialValue="<p>This is the initial content of the editor</p>"
        init={{
        theme: 'modern',
        plugins: 'print preview fullpage powerpaste searchreplace autolink directionality advcode visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount tinymcespellchecker a11ychecker imagetools mediaembed linkchecker contextmenu colorpicker textpattern help',
        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
    }}
        onChange={props.onChange}/>)
}

ACCEditor.propTypes = {
    onChange: PropTypes.func.isRequired
}

export default ACCEditor
