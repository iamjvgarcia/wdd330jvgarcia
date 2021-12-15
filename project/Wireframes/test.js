"use strict";

const {
  useState,
  useEffect,
  useRef
} = React;

function Notepad() {
  let [show, setShow] = useState("menu");
  let [currNote, setCurrNote] = useState({
    id: "",
    title: "",
    content: ""
  });
  let [notes, setNotes] = useState([]);
  useEffect(() => {
    let data = window.localStorage.getItem("notepad");
    setNotes(data === null ? [] : JSON.parse(data));
  }, []);
  useEffect(() => {
    if (notes !== null) window.localStorage.setItem("notepad", JSON.stringify(notes));
  }, [notes]);

  function createClickHandler() {
    setCurrNote({
      id: guid(),
      title: "untitled",
      content: ""
    });
    setShow("editor");
  }

  function loadNote(note) {
    setCurrNote(note);
    setShow("editor");
  }

  function saveNote(note) {
    let index = notes.findIndex(n => n.id === note.id);
    if (index !== -1) notes[index] = note;else notes.push(note);
    setNotes([...notes]);
  }

  function deleteNote(note) {
    let index = notes.findIndex(n => n.id === note.id);
    notes.splice(index, 1);
    setNotes([...notes]);
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "notepad"
  }, /*#__PURE__*/React.createElement(Menu, {
    show: show === "menu",
    onCreate: createClickHandler,
    onLoad: () => setShow("files")
  }), /*#__PURE__*/React.createElement(Files, {
    data: notes,
    show: show === "files",
    onSelect: loadNote,
    onDelete: deleteNote,
    onCancel: () => setShow("menu")
  }), /*#__PURE__*/React.createElement(Editor, {
    show: show === "editor",
    note: currNote,
    onSave: saveNote,
    onCancel: () => setShow("menu")
  }));
}

function Menu(props) {
  const {
    show,
    onCreate,
    onLoad
  } = props;
  return /*#__PURE__*/React.createElement("div", {
    className: "menu " + (show ? "show" : "hide")
  }, /*#__PURE__*/React.createElement("h1", null, "Notepad"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onCreate
  }, "Create New"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onLoad
  }, "My Notes"));
}

function Files(props) {
  const {
    show,
    data,
    onSelect,
    onDelete,
    onCancel
  } = props;
  return /*#__PURE__*/React.createElement("div", {
    className: "file " + (show ? "show" : "hide")
  }, /*#__PURE__*/React.createElement("div", null, "select your note to load:"), /*#__PURE__*/React.createElement("div", {
    className: "list"
  }, /*#__PURE__*/React.createElement("ul", null, data.map(n => /*#__PURE__*/React.createElement("li", {
    className: "flex items-center",
    key: n.id
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: () => onSelect(n)
  }, n.title), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ml-auto",
    onClick: () => onDelete(n)
  }, "Delete"))))), /*#__PURE__*/React.createElement("div", {
    className: "flex"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ml-auto",
    onClick: onCancel
  }, "Cancel")));
}

function Editor(props) {
  const titlebox = useRef();
  const {
    show,
    onSave,
    onCancel
  } = props;
  let [note, setNote] = useState({
    id: props.note.id,
    title: props.note.title,
    content: props.note.content
  });
  useEffect(() => {
    setNote({ ...props.note
    });
  }, [props.note]);
  useEffect(() => {
    titlebox.current.focus();
    titlebox.current.select();
  }, [props.show]);
  return /*#__PURE__*/React.createElement("div", {
    className: "editor " + (show ? "show" : "hide")
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "note title...",
    ref: titlebox,
    value: note.title,
    onChange: e => setNote({ ...note,
      title: e.target.value
    })
  }), /*#__PURE__*/React.createElement("textarea", {
    value: note.content,
    onChange: e => setNote({ ...note,
      content: e.target.value
    })
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ml-auto mr-10",
    onClick: onCancel
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => onSave(note)
  }, "Save")));
}

function App() {
  return /*#__PURE__*/React.createElement(Notepad, null);
}

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("app")); // helpers //

function guid(len = 5) {
  let id = "";

  for (let i = 0; i < len; i++) {
    id += Math.floor(Math.random() * 16).toString(16);
  }

  return id;
}