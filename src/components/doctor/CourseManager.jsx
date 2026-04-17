import React, { useState, useRef, useEffect } from "react";
import {
  Plus,
  Edit3,
  Trash2,
  Layers,
  BookOpen,
  Save,
  Video,
  Link as LinkIcon,
  FileText,
  HelpCircle,
  Upload,
  ChevronDown,
  ChevronUp,
  ClipboardList,
  ArrowLeft,
  X,
  Globe,
  Eye,
} from "lucide-react";

// --- 1. QUIZ MODAL COMPONENT ---
const QuizModal = ({ isOpen, onClose, onSave, moduleTitle, existingQuiz }) => {
  const [questions, setQuestions] = useState([
    { id: 1, text: "", options: ["", "", "", ""], correct: 0 },
  ]);

  useEffect(() => {
    if (existingQuiz && isOpen) {
      setQuestions(existingQuiz);
    } else if (isOpen) {
      setQuestions([
        { id: 1, text: "", options: ["", "", "", ""], correct: 0 },
      ]);
    }
  }, [existingQuiz, isOpen]);

  if (!isOpen) return null;

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { id: Date.now(), text: "", options: ["", "", "", ""], correct: 0 },
    ]);
  };

  const updateQuestionText = (id, text) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, text } : q)));
  };

  const updateOption = (qId, oIdx, val) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === qId) {
          const newOpts = [...q.options];
          newOpts[oIdx] = val;
          return { ...q, options: newOpts };
        }
        return q;
      }),
    );
  };

  return (
    <div className="modal-overlay">
      <div className="quiz-modal animate-slideUp">
        <header className="modal-header">
          <div>
            <h2>Module Assessment</h2>
            <p>
              Reviewing quiz for: <strong>{moduleTitle || "New Module"}</strong>
            </p>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </header>

        <div className="modal-body">
          {questions.map((q, qIdx) => (
            <div key={q.id} className="quiz-question-card">
              <div className="question-header">
                <span>Question {qIdx + 1}</span>
                <button
                  className="text-danger"
                  onClick={() =>
                    setQuestions(questions.filter((item) => item.id !== q.id))
                  }
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <input
                className="modern-input"
                placeholder="e.g. Which anatomical structure is responsible for..."
                value={q.text}
                onChange={(e) => updateQuestionText(q.id, e.target.value)}
              />

              <div className="options-grid">
                {q.options.map((opt, oIdx) => (
                  <div
                    key={oIdx}
                    className={`option-input-wrapper ${q.correct === oIdx ? "selected" : ""}`}
                  >
                    <input
                      type="radio"
                      name={`correct-${q.id}`}
                      checked={q.correct === oIdx}
                      onChange={() => {
                        setQuestions(
                          questions.map((item) =>
                            item.id === q.id
                              ? { ...item, correct: oIdx }
                              : item,
                          ),
                        );
                      }}
                    />
                    <input
                      placeholder={`Option ${oIdx + 1}`}
                      value={opt}
                      onChange={(e) => updateOption(q.id, oIdx, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button className="btn-outline-wide" onClick={addQuestion}>
            <Plus size={18} /> Add New Question
          </button>
        </div>

        <footer className="modal-footer">
          <button className="btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn-save"
            onClick={() => {
              onSave(questions);
              onClose();
            }}
          >
            Save Quiz Content
          </button>
        </footer>
      </div>
    </div>
  );
};

// --- RESOURCE MODAL ---
const ResourceModal = ({
  type,
  isOpen,
  onClose,
  onSave,
  moduleTitle,
  initialData,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    instructions: "",
    fileName: "",
  });
  const bookInputRef = useRef(null);

  useEffect(() => {
    if (initialData && isOpen) {
      setFormData(initialData);
    } else if (isOpen) {
      setFormData({ title: "", url: "", instructions: "", fileName: "" });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleBookUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, fileName: file.name, title: file.name });
    }
  };

  const handleSubmit = () => {
    onSave({ ...formData, id: formData.id || Date.now(), type });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="quiz-modal animate-slideUp" style={{ maxWidth: "500px" }}>
        <header className="modal-header">
          <div>
            <h2>
              {initialData ? "Edit" : "Add"}{" "}
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </h2>
            <p>Module: {moduleTitle}</p>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </header>
        <div className="modal-body">
          <div className="input-group">
            <label>Title</label>
            <input
              className="modern-input"
              placeholder="Enter title..."
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          {(type === "video" || type === "link") && (
            <div className="input-group">
              <label>URL / Link</label>
              <input
                className="modern-input"
                placeholder="https://..."
                value={formData.url}
                onChange={(e) =>
                  setFormData({ ...formData, url: e.target.value })
                }
              />
            </div>
          )}

          {type === "book" && (
            <div className="input-group">
              <label>Upload Document</label>
              <div
                className="image-upload-card"
                style={{ height: "120px", borderStyle: "dashed" }}
                onClick={() => bookInputRef.current.click()}
              >
                {formData.fileName ? (
                  <div className="file-info-view">
                    <FileText size={32} />
                    <span>{formData.fileName}</span>
                  </div>
                ) : (
                  <div className="upload-placeholder">
                    <Upload size={24} />
                    <span>Click to Upload PDF/Book</span>
                  </div>
                )}
              </div>
              <input
                type="file"
                ref={bookInputRef}
                hidden
                onChange={handleBookUpload}
                accept=".pdf,.doc,.docx,.epub"
              />
            </div>
          )}

          {type === "assignment" && (
            <div className="input-group">
              <label>Instructions</label>
              <textarea
                className="modern-textarea"
                placeholder="Describe the assignment task..."
                value={formData.instructions}
                onChange={(e) =>
                  setFormData({ ...formData, instructions: e.target.value })
                }
              />
            </div>
          )}
        </div>
        <footer className="modal-footer">
          <button className="btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-save" onClick={handleSubmit}>
            {initialData ? "Update Item" : "Add to Module"}
          </button>
        </footer>
      </div>
    </div>
  );
};

// --- 2. EDITOR COMPONENT ---
const EditorView = ({
  currentCourse,
  setCurrentCourse,
  setActiveView,
  saveCourse,
}) => {
  const [expandedModule, setExpandedModule] = useState(null);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [activeModuleForQuiz, setActiveModuleForQuiz] = useState(null);
  const [resourceModal, setResourceModal] = useState({
    isOpen: false,
    type: "video",
    moduleId: null,
    initialData: null,
  });

  const fileInputRef = useRef(null);

  const updateModule = (modId, updates) => {
    const updated = currentCourse.modules.map((m) =>
      m.id === modId ? { ...m, ...updates } : m,
    );
    setCurrentCourse({ ...currentCourse, modules: updated });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCurrentCourse({ ...currentCourse, courseImage: imageUrl });
    }
  };

  const handleSaveQuiz = (quizData) => {
    if (activeModuleForQuiz) {
      updateModule(activeModuleForQuiz.id, { quiz: quizData });
    }
  };

  const handleSaveResource = (resource) => {
    const mod = currentCourse.modules.find(
      (m) => m.id === resourceModal.moduleId,
    );
    const existingResources = mod.resources || [];
    const resourceExists = existingResources.find((r) => r.id === resource.id);
    const updatedResources = resourceExists
      ? existingResources.map((r) => (r.id === resource.id ? resource : r))
      : [...existingResources, resource];

    updateModule(resourceModal.moduleId, { resources: updatedResources });
  };

  // Helper to preview assets based on type
  const previewAsset = (r, mod) => {
    if (r.type === "video" || r.type === "link") {
      if (r.url) window.open(r.url, "_blank");
      else alert("No URL provided for this asset.");
    } else {
      // For Book and Assignment, open the modal in view mode
      setResourceModal({
        isOpen: true,
        type: r.type,
        moduleId: mod.id,
        initialData: r,
      });
    }
  };

  return (
    <div className="editor-container animate-fadeIn">
      <nav className="editor-nav">
        <button onClick={() => setActiveView("list")} className="back-btn">
          <ArrowLeft size={18} /> Back
        </button>
        <div className="editor-actions">
          <span className="status-tag">{currentCourse.status}</span>
          <button onClick={saveCourse} className="btn-save">
            <Save size={18} /> Save & Publish
          </button>
        </div>
      </nav>

      <div className="editor-layout">
        <aside className="course-identity-sidebar">
          <div
            className="image-upload-card"
            onClick={() => fileInputRef.current.click()}
          >
            {currentCourse.courseImage ? (
              <img
                src={currentCourse.courseImage}
                alt="Preview"
                className="course-preview-img"
              />
            ) : (
              <div className="upload-placeholder">
                <Upload size={32} />
                <span>Upload Course Cover</span>
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              hidden
              onChange={handleImageUpload}
              accept="image/*"
            />
          </div>

          <div className="input-group">
            <label>Course Title</label>
            <input
              className="modern-input"
              value={currentCourse.title || ""}
              onChange={(e) =>
                setCurrentCourse({ ...currentCourse, title: e.target.value })
              }
              placeholder="e.g. Clinical Neurology Basics"
            />
          </div>

          <div className="input-group">
            <label>Description</label>
            <textarea
              className="modern-textarea"
              value={currentCourse.description || ""}
              onChange={(e) =>
                setCurrentCourse({
                  ...currentCourse,
                  description: e.target.value,
                })
              }
              placeholder="Describe what students will learn..."
            />
          </div>
        </aside>

        <main className="module-builder">
          <div className="section-header">
            <h3>
              <Layers size={22} /> Curriculum Structure
            </h3>
            <button
              className="btn-add-main"
              onClick={() => {
                const newMod = {
                  id: Date.now(),
                  title: "",
                  description: "",
                  quiz: null,
                  resources: [],
                };
                setCurrentCourse({
                  ...currentCourse,
                  modules: [...currentCourse.modules, newMod],
                });
              }}
            >
              <Plus size={18} /> Add Module
            </button>
          </div>

          <div className="module-list">
            {currentCourse.modules.map((mod, index) => (
              <div key={mod.id} className="module-accordion-item">
                <div
                  className="module-summary"
                  onClick={() =>
                    setExpandedModule(expandedModule === mod.id ? null : mod.id)
                  }
                >
                  <div className="mod-title-area">
                    <span className="mod-index">{index + 1}</span>
                    <input
                      placeholder="Enter Module Title..."
                      value={mod.title}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) =>
                        updateModule(mod.id, { title: e.target.value })
                      }
                    />
                  </div>
                  {mod.quiz && <span className="quiz-badge">Quiz Added</span>}
                  <div className="mod-controls">
                    {expandedModule === mod.id ? (
                      <ChevronUp />
                    ) : (
                      <ChevronDown />
                    )}
                  </div>
                </div>

                {expandedModule === mod.id && (
                  <div className="module-details-expanded">
                    <div className="input-group">
                      <label>Module Description</label>
                      <textarea
                        className="modern-textarea"
                        placeholder="Learning objectives..."
                        value={mod.description}
                        onChange={(e) =>
                          updateModule(mod.id, { description: e.target.value })
                        }
                      />
                    </div>

                    <div className="resource-grid">
                      <div className="resource-sub-section">
                        <label>
                          <Video size={14} /> Content & Media
                        </label>
                        <div className="action-row">
                          <button
                            className="btn-icon-label"
                            onClick={() =>
                              setResourceModal({
                                isOpen: true,
                                type: "video",
                                moduleId: mod.id,
                                initialData: null,
                              })
                            }
                          >
                            <Video size={14} /> Video
                          </button>
                          <button
                            className="btn-icon-label"
                            onClick={() =>
                              setResourceModal({
                                isOpen: true,
                                type: "book",
                                moduleId: mod.id,
                                initialData: null,
                              })
                            }
                          >
                            <FileText size={14} /> PDF/Book
                          </button>
                          <button
                            className="btn-icon-label"
                            onClick={() =>
                              setResourceModal({
                                isOpen: true,
                                type: "link",
                                moduleId: mod.id,
                                initialData: null,
                              })
                            }
                          >
                            <LinkIcon size={14} /> Link
                          </button>
                        </div>
                      </div>

                      <div className="resource-sub-section">
                        <label>
                          <HelpCircle size={14} /> Assessment
                        </label>
                        <div className="action-row">
                          <button
                            className={`btn-icon-label quiz ${mod.quiz ? "active" : ""}`}
                            onClick={() => {
                              setActiveModuleForQuiz(mod);
                              setIsQuizModalOpen(true);
                            }}
                          >
                            <HelpCircle size={14} />{" "}
                            {mod.quiz ? "Edit Quiz" : "Create Quiz"}
                          </button>
                          <button
                            className="btn-icon-label assignment"
                            onClick={() =>
                              setResourceModal({
                                isOpen: true,
                                type: "assignment",
                                moduleId: mod.id,
                                initialData: null,
                              })
                            }
                          >
                            <ClipboardList size={14} /> Assignment
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* --- PROFESSIONAL RESOURCE INVENTORY SECTION --- */}
                    {(mod.resources?.length > 0 || mod.quiz) && (
                      <div className="resources-inventory">
                        <h4 className="inventory-title">
                          Module Assets (
                          {(mod.resources?.length || 0) + (mod.quiz ? 1 : 0)})
                        </h4>
                        <div className="resources-grid-creative">
                          {/* Display Quiz Asset if it exists */}
                          {mod.quiz && (
                            <div className="resource-card-modern quiz">
                              <div className="resource-icon-box">
                                <HelpCircle size={18} />
                              </div>
                              <div className="resource-info">
                                <span className="resource-type-label">
                                  Quiz
                                </span>
                                <p className="resource-name">
                                  Module Assessment
                                </p>
                              </div>
                              <div className="resource-actions">
                                <button
                                  className="action-circle view"
                                  title="View Quiz"
                                  onClick={() => {
                                    setActiveModuleForQuiz(mod);
                                    setIsQuizModalOpen(true);
                                  }}
                                >
                                  <Eye size={14} />
                                </button>
                                <button
                                  className="action-circle delete"
                                  title="Remove Quiz"
                                  onClick={() =>
                                    updateModule(mod.id, { quiz: null })
                                  }
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </div>
                          )}

                          {/* Display other resources */}
                          {mod.resources?.map((r) => (
                            <div
                              key={r.id}
                              className={`resource-card-modern ${r.type}`}
                            >
                              <div className="resource-icon-box">
                                {r.type === "video" && <Video size={18} />}
                                {r.type === "book" && <FileText size={18} />}
                                {r.type === "link" && <Globe size={18} />}
                                {r.type === "assignment" && (
                                  <ClipboardList size={18} />
                                )}
                              </div>

                              <div className="resource-info">
                                <span className="resource-type-label">
                                  {r.type}
                                </span>
                                <p className="resource-name">
                                  {r.title || "Untitled Asset"}
                                </p>
                              </div>

                              <div className="resource-actions">
                                <button
                                  className="action-circle view"
                                  title="Preview Content"
                                  onClick={() => previewAsset(r, mod)}
                                >
                                  <Eye size={14} />
                                </button>

                                <button
                                  className="action-circle edit"
                                  title="Edit Details"
                                  onClick={() =>
                                    setResourceModal({
                                      isOpen: true,
                                      type: r.type,
                                      moduleId: mod.id,
                                      initialData: r,
                                    })
                                  }
                                >
                                  <Edit3 size={14} />
                                </button>

                                <button
                                  className="action-circle delete"
                                  title="Remove Asset"
                                  onClick={() => {
                                    const filtered = mod.resources.filter(
                                      (item) => item.id !== r.id,
                                    );
                                    updateModule(mod.id, {
                                      resources: filtered,
                                    });
                                  }}
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>

      <QuizModal
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
        onSave={handleSaveQuiz}
        moduleTitle={activeModuleForQuiz?.title}
        existingQuiz={activeModuleForQuiz?.quiz}
      />

      <ResourceModal
        isOpen={resourceModal.isOpen}
        type={resourceModal.type}
        moduleTitle={
          currentCourse.modules.find((m) => m.id === resourceModal.moduleId)
            ?.title
        }
        initialData={resourceModal.initialData}
        onClose={() => setResourceModal({ ...resourceModal, isOpen: false })}
        onSave={handleSaveResource}
      />
    </div>
  );
};

// --- 3. LIST COMPONENT ---
const ListView = ({ courses, setCourses, openEditor }) => (
  <div className="list-view-container animate-fadeIn">
    <header className="manager-header">
      <div>
        <h2 className="gradient-text">Medical Curriculum Manager</h2>
        <p>Build and distribute world-class medical knowledge.</p>
      </div>
      <button className="btn-innovative-add" onClick={() => openEditor()}>
        <Plus size={20} />
        <span>Create New Course</span>
      </button>
    </header>

    <div className="course-management-grid">
      {courses.map((course) => (
        <div key={course.id} className="management-card">
          <div className="card-main-content">
            <div className="image-preview-mini">
              {course.courseImage ? (
                <img src={course.courseImage} alt="" />
              ) : (
                <BookOpen size={24} />
              )}
            </div>
            <div className="card-body-info">
              <h3>{course.title || "Untitled Course"}</h3>
              <div className="badge-row">
                <span className="status-pill draft">{course.status}</span>
                <span className="mod-count">
                  {course.modules.length} Modules
                </span>
              </div>
            </div>
            <div className="card-actions-footer">
              <button
                className="action-btn edit"
                onClick={() => openEditor(course)}
              >
                <Edit3 size={16} /> Edit
              </button>
              <button
                className="action-btn delete"
                onClick={() =>
                  setCourses(courses.filter((c) => c.id !== course.id))
                }
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// --- 4. MAIN WRAPPER ---
const CourseManager = () => {
  const [courses, setCourses] = useState([]);
  const [activeView, setActiveView] = useState("list");
  const [currentCourse, setCurrentCourse] = useState(null);

  const openEditor = (course = null) => {
    if (course) {
      setCurrentCourse(course);
    } else {
      setCurrentCourse({
        id: Date.now(),
        title: "",
        description: "",
        status: "Draft",
        courseImage: null,
        modules: [
          {
            id: 1,
            title: "Introduction",
            description: "",
            quiz: null,
            resources: [],
          },
        ],
      });
    }
    setActiveView("editor");
  };

  const saveCourse = () => {
    if (!currentCourse.title) return alert("Please enter a course title.");
    setCourses((prev) => {
      const exists = prev.find((c) => c.id === currentCourse.id);
      if (exists)
        return prev.map((c) => (c.id === currentCourse.id ? currentCourse : c));
      return [currentCourse, ...prev];
    });
    setActiveView("list");
  };

  return (
    <div className="main-app-container">
      {activeView === "list" ? (
        <ListView
          courses={courses}
          setCourses={setCourses}
          openEditor={openEditor}
        />
      ) : (
        <EditorView
          currentCourse={currentCourse}
          setCurrentCourse={setCurrentCourse}
          setActiveView={setActiveView}
          saveCourse={saveCourse}
        />
      )}
    </div>
  );
};

export default CourseManager;
