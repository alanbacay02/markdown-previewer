import './App.css';
import ReactMarkdown from 'react-markdown';
import { useState } from 'react';
import PropTypes from 'prop-types';
import remarkGfm from 'remark-gfm';
import PREVIEW_TEXT from './previewText.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKeyboard, faEye } from '@fortawesome/free-regular-svg-icons';
import { faMaximize } from '@fortawesome/free-solid-svg-icons';

function MarkdownEditor({ markdownText, handleChange }) {
	return (
		<div className="text-black mt-8 mb-4 max-w-xl mx-auto">
			<div id="toolbar" className="flex flex-row justify-between mx-auto py-1 px-2 bg-[#2d2d2d] text-white">
				<FontAwesomeIcon icon={faKeyboard} className="my-auto"></FontAwesomeIcon>
				<button><FontAwesomeIcon icon={faMaximize}></FontAwesomeIcon></button>
			</div>
			<textarea
				id="editor"
				value={markdownText}
				onChange={handleChange}
				placeholder="Enter markdown text here..."
				className="w-full h-40 resize-y p-3 bg-[#2a2727] text-[#f5f5f5]">
			</textarea>
		</div>
	);
}
MarkdownEditor.propTypes = {
	markdownText: PropTypes.string,
	handleChange: PropTypes.func.isRequired
};

function MarkdownPreview({ textToRender }) {
	return (
		<div id="preview" className="max-w-3xl mx-auto mt-8 bg-[#2a2727]">
			<div id="toolbar" className="flex flex-row justify-between mx-auto py-1 px-2 bg-[#2d2d2d] text-white">
				<FontAwesomeIcon icon={faEye} className="my-auto"></FontAwesomeIcon>
				<button><FontAwesomeIcon icon={faMaximize}></FontAwesomeIcon></button>
			</div>
			<ReactMarkdown 
				remarkPlugins={[remarkGfm]} 
				className="markdown-preview justify-center px-3 text-[#f5f5f5]">
				{textToRender}
			</ReactMarkdown>
		</div>
	);
}

MarkdownPreview.propTypes = {
	textToRender: PropTypes.string
};

export default function App () {
	// Creates `markdownText` state to store markdown text to be previewed.
	const [markdownText, setMarkdownText] = useState(PREVIEW_TEXT);

	function handleChange(event) {
		setMarkdownText(event.currentTarget.value);
	}

	return (
		<div className="px-1">
			<MarkdownEditor markdownText={markdownText} handleChange={handleChange}/>
			<MarkdownPreview textToRender={markdownText} />
		</div>
	);
}
