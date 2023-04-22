import './App.css';
import Marked from 'marked-react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import PREVIEW_TEXT from './previewText.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKeyboard, faEye } from '@fortawesome/free-regular-svg-icons';
import { faMaximize, faMinimize } from '@fortawesome/free-solid-svg-icons';

// Creates a default component style for components in the app/
const COMPONENT_STYLE = {
	backgroundColor: '#0c2d5c',
	color: 'white'
};

// Creates a component style for maxmized components.
const MAX_COMPONENT_STYLE = {
	backgroundColor: '#0c2d5c',
	color: 'white',
	height: '100vh'
};

// Creates a default toolbar style for each component.
const TOOLBAR_STYLE = {
	backgroundColor: '#123d79',
	color: 'white'
};

// Creates a function component `MarkdownEditor` where the user can enter markdown text. The props `markdownText` will be the markdown text to be rendered in the text area, `handleChange` is a function, `handleClick` is a function that will handle the maximize button on click, and `maxComponent` to track if component is maximized.
function MarkdownEditor({ markdownText, handleChange, handleClick, maxComponent }) {
	return (
		// A style will be conditionally applied to the div depending on `maxComponent` state. If `null`, regular style is applied, and if `maxComponent` value is equal to the components name, the component is set to fullscreen. If `maxComponent` is not equal to component name, component is then hidden.
		<div className="mt-8 mb-4 max-w-xl mx-auto" style={!maxComponent ? COMPONENT_STYLE : maxComponent == 'MarkdownEditor' ? MAX_COMPONENT_STYLE : {display: 'none'}}>
			<div id="toolbar" style={TOOLBAR_STYLE} className="flex flex-row justify-between mx-auto py-1 px-2 rounded-t-lg">
				<FontAwesomeIcon icon={faKeyboard} className="my-auto"></FontAwesomeIcon>
				{/* Conditionally renders the button depending if component is maximized or not. */}
				{!maxComponent ? 
					<button onClick={() => handleClick('MarkdownEditor')}><FontAwesomeIcon icon={faMaximize}></FontAwesomeIcon></button> :
					<button onClick={() => handleClick(null)}><FontAwesomeIcon icon={faMinimize}></FontAwesomeIcon></button>
				}
			</div>
			<textarea
				id="editor"
				value={markdownText}
				onChange={handleChange}
				placeholder="Enter markdown text here..."
				// A style will be conditionally applied to the div depending on `maxComponent` state
				style={!maxComponent ? COMPONENT_STYLE : maxComponent === 'MarkdownEditor' ? MAX_COMPONENT_STYLE : {display: 'none'}}
				className="w-full h-40 resize-y p-3 rounded-b-lg">
			</textarea>
		</div>
	);
}
// Validates props for `MarkdownPreview`.
MarkdownEditor.propTypes = {
	markdownText: PropTypes.string,
	handleChange: PropTypes.func.isRequired,
	handleClick: PropTypes.func.isRequired,
	maxComponent: PropTypes.oneOf([PropTypes.bool, PropTypes.string])
};

// Creates a function component `MarkdownPreview` where our markdown text will be parsed and rendered. The props `textToRender` will be the markdown text to be rendered, `handleClick` is a function that will handle the maximize button on click, and `maxComponent` to track if component is maximized.
function MarkdownPreview({ textToRender, handleClick, maxComponent }) {
	return (
		// A style will be conditionally applied to the div depending on `maxComponent` state, same as `MarkdownEditor`.
		<div className="max-w-3xl mx-auto mt-8" style={!maxComponent ? COMPONENT_STYLE : maxComponent == 'MarkdownPreview' ? MAX_COMPONENT_STYLE : {display: 'none'}}>
			<div id="toolbar" style={TOOLBAR_STYLE} className="flex flex-row justify-between mx-auto py-1 px-2 rounded-t-lg">
				<FontAwesomeIcon icon={faEye} className="my-auto"></FontAwesomeIcon>
				{/* Conditionally renders the button depending if component is maximized or not. */}
				{!maxComponent ? 
					<button onClick={() => handleClick('MarkdownPreview')}><FontAwesomeIcon icon={faMaximize}></FontAwesomeIcon></button> :
					<button onClick={() => handleClick(null)}><FontAwesomeIcon icon={faMinimize}></FontAwesomeIcon></button>
				}
			</div>
			<div id="preview" className="text-sm md:text-base md:leading-7 pt-[1px] rounded-b-lg justify-center px-3" style={!maxComponent ? COMPONENT_STYLE : maxComponent == 'MarkdownPreview' ? MAX_COMPONENT_STYLE : {display: 'none'}}>
				{/* Our `textToRender` from `MarkdownEditor` is parsed into `markdown-react`. */}
				<Marked id="preview" className="py-4">
					{textToRender}
				</Marked>
			</div>
		</div>
	);
}
// Validates props for `MarkdownPreview`.
MarkdownPreview.propTypes = {
	textToRender: PropTypes.string,
	handleClick: PropTypes.func.isRequired,
	maxComponent: PropTypes.oneOf([PropTypes.bool, PropTypes.string])
};

export default function App () {
	// Creates `markdownText` state to store markdown text to be previewed.
	const [markdownText, setMarkdownText] = useState(PREVIEW_TEXT);
	// Creates `maxComponent` state to track if component should maximized or not.
	const [maxComponent, setMaxComponent] = useState(null);

	// Creates a function to handle text inputed to `MarkdownEditor` and sets it to state `MarkdownText`.
	function handleChange(event) {
		setMarkdownText(event.currentTarget.value);
	}

	// Creates a function that will be called when the maximize button is clicked. The component name will then be assigned to `maxComponent` state.
	function handleClick(component) {
		setMaxComponent(component);
	}

	// Renders `MarkdownEditor` and `MarkdownPreview` components.
	// `MarkdownEditor` is passed props `markdownText` which is string, `handleChange` which is a function, `handleClick` which is a function, and `maxComponent` which is a string.
	// `MarkdownPreview` is passed props `markdownText` which is string to be rendered as Markdown Text, `handleChange` which is a function, `handleClick` which is a function, and `maxComponent` which is a string.
	return (
		<div className="px-[7px]">
			<MarkdownEditor markdownText={markdownText} handleChange={handleChange} handleClick={handleClick} maxComponent={maxComponent}/>
			<MarkdownPreview textToRender={markdownText} handleClick={handleClick} maxComponent={maxComponent}/>
		</div>
	);
}
