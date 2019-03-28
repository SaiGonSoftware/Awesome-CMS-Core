import React from 'react'
import PropTypes from 'prop-types'
import {Editor} from '@tinymce/tinymce-react';
import {APP_CONFIG} from 'Helper/Config';

const ACCEditor = (props) => {
    return (<Editor
        apiKey={APP_CONFIG.EDITOR_API_KEY}
        initialValue=""
        value={props.value}
        init={{
        theme: 'modern',
        plugins: 'print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount imagetools contextmenu colorpicker textpattern help',
        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code',
        height: "300"
    }}
        onChange={props.onChange}/>)
}

ACCEditor.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string
}

export default ACCEditor
