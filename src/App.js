import './App.css';
import ReactMarkdown from 'react-markdown';
import { useState } from 'react';
import PropTypes from 'prop-types';
import remarkGfm from 'remark-gfm';
import PREVIEW_TEXT from './previewText.js';

function MarkdownEditor({ markdownText, handleChange }) {
	return (
		<div className="text-black flex mx-auto max-w-xl h-32 justify-center">
			<textarea
				id="editor"
				value={markdownText}
				onChange={handleChange}
				placeholder="Enter markdown text here..."
				className="w-full rounded-md resize-y p-3">
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
		<div id="preview" className="markdown-preview max-w-xl justify-center mx-auto">
			<ReactMarkdown remarkPlugins={[remarkGfm]} >{textToRender}</ReactMarkdown>
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
		<div>
			<MarkdownEditor markdownText={markdownText} handleChange={handleChange}/>
			<MarkdownPreview textToRender={markdownText} />
		</div>
	);
}
