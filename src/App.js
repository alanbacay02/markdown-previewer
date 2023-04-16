import './App.css';
import ReactMarkdown from 'react-markdown';
import { useState } from 'react';
import PropTypes from 'prop-types';
import remarkGfm from 'remark-gfm';
import PREVIEW_TEXT from './previewText.js';

function MarkdownEditor({ markdownText, handleChange }) {
	return (
		<div className="text-black mt-8 mb-4 max-w-xl mx-auto">
			<div id="toolbar" className="flex flex-row justify-between mx-auto py-1 px-2 bg-slate-500">
				<p>Editor</p>
				<button>Button</button>
			</div>
			<textarea
				id="editor"
				value={markdownText}
				onChange={handleChange}
				placeholder="Enter markdown text here..."
				className="w-full h-32 resize-y p-3">
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
		<div id="preview" className="max-w-3xl mx-auto mt-8 bg-[#020617]">
			<div id="toolbar" className="flex flex-row justify-between mx-auto px-2 bg-slate-500">
				<p>Editor</p>
				<button>Button</button>
			</div>
			<ReactMarkdown 
				remarkPlugins={[remarkGfm]} 
				className="markdown-preview justify-center px-3">
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
