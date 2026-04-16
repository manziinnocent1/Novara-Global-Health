import React, { useState } from "react";
import {
  Plus,
  Edit3,
  Trash2,
  Eye,
  MoreVertical,
  Layers,
  BookOpen,
  X,
  ChevronRight,
  FileText,
  HelpCircle,
  Save,
} from "lucide-react";

// --- SUB-COMPONENTS ---

const EditorView = ({
  currentCourse,
  setCurrentCourse,
  setActiveView,
  saveCourse,
}) => (
  <div className="editor-container animate-fadeIn">
    <nav className="editor-nav">
      <button onClick={() => setActiveView("list")} className="back-btn">
        ← Back to Curriculum
      </button>
      <div className="editor-actions">
        <span className="status-tag">{currentCourse.status}</span>
        <button onClick={saveCourse} className="btn-save">
          <Save size={18} /> Save Changes
        </button>
      </div>
    </nav>

    <div className="editor-grid">
      <div className="editor-main">
        <section className="editor-card">
          <input
            className="title-input"
            placeholder="Course Title..."
            value={currentCourse.title || ""}
            onChange={(e) =>
              setCurrentCourse({ ...currentCourse, title: e.target.value })
            }
          />
          <textarea
            className="desc-input"
            placeholder="Describe what students will learn in this medical course..."
            value={currentCourse.description || ""}
            onChange={(e) =>
              setCurrentCourse({
                ...currentCourse,
                description: e.target.value,
              })
            }
          />
        </section>

        <section className="module-section">
          <div className="section-header">
            <h3>
              <Layers size={20} /> Curriculum Modules
            </h3>
            <button
              className="add-small"
              onClick={() => {
                const newMod = {
                  id: Date.now(),
                  title: "New Module",
                  content: "",
                };
                setCurrentCourse({
                  ...currentCourse,
                  modules: [...currentCourse.modules, newMod],
                });
              }}
            >
              <Plus size={16} /> Add Module
            </button>
          </div>
          {/* Added optional chaining and fallback to prevent blank screen crash */}
          {(currentCourse.modules || []).map((mod, index) => (
            <div key={mod.id} className="module-item">
              <span className="mod-number">{index + 1}</span>
              <input
                value={mod.title || ""}
                onChange={(e) => {
                  const updated = currentCourse.modules.map((m) =>
                    m.id === mod.id ? { ...m, title: e.target.value } : m,
                  );
                  setCurrentCourse({ ...currentCourse, modules: updated });
                }}
              />
              <FileText size={18} className="text-muted" />
            </div>
          ))}
        </section>
      </div>

      <div className="editor-sidebar">
        <div className="sidebar-card">
          <h4>Assessment Quizzes</h4>
          <p className="hint">Interactive evaluations for certification.</p>
          {(currentCourse.quizzes || []).map((q) => (
            <div key={q.id} className="quiz-pill">
              {q.title}
            </div>
          ))}
          <button
            className="btn-outline-add"
            onClick={() => {
              const newQuiz = {
                id: Date.now(),
                title: "Final Assessment",
                questions: [],
              };
              setCurrentCourse({
                ...currentCourse,
                quizzes: [...(currentCourse.quizzes || []), newQuiz],
              });
            }}
          >
            <HelpCircle size={16} /> Create Quiz
          </button>
        </div>

        <div className="sidebar-card promo">
          <h4>Innovator Tools</h4>
          <div className="tool-option">
            <input type="checkbox" id="cert" />
            <label htmlFor="cert">Enable AI Grading</label>
          </div>
          <div className="tool-option">
            <input type="checkbox" id="public" />
            <label htmlFor="public">Global Health Access</label>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ListView = ({ courses, setCourses, openEditor }) => (
  <>
    <header className="manager-header">
      <div>
        <h2 className="gradient-text">Course Curriculum</h2>
        <p>
          Create, refine, and manage your global health educational content.
        </p>
      </div>
      <button className="btn-innovative-add" onClick={() => openEditor()}>
        <Plus size={20} />
        <span>Create New Course</span>
      </button>
    </header>

    <div className="manager-toolbar">
      <div className="search-pill">
        <Layers size={16} />
        <span>Active Courses: {courses.length}</span>
      </div>
    </div>

    <div className="course-management-grid">
      {courses.map((course) => (
        <div key={course.id} className="management-card">
          <div
            className="card-status-strip"
            style={{ backgroundColor: course.color || "#4f46e5" }}
          ></div>
          <div className="card-main-content">
            <div className="card-header-row">
              <div
                className="icon-box"
                style={{
                  backgroundColor: `${course.color || "#4f46e5"}15`,
                  color: course.color || "#4f46e5",
                }}
              >
                <BookOpen size={22} />
              </div>
              <button className="icon-btn-ghost">
                <MoreVertical size={18} />
              </button>
            </div>
            <div className="card-body-info">
              <h3>{course.title || "Untitled Course"}</h3>
              <div className="badge-row">
                <span
                  className={`status-pill ${(course.status || "Draft").toLowerCase()}`}
                >
                  {course.status || "Draft"}
                </span>
                <span className="student-count">
                  {course.students || 0} Students
                </span>
              </div>
            </div>
            <div className="card-actions-footer">
              <button
                className="action-btn edit"
                onClick={() => openEditor(course)}
              >
                <Edit3 size={16} /> Edit Content
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
  </>
);

// --- MAIN COMPONENT ---

const CourseManager = ({ courses: initialCourses = [] }) => {
  const [courses, setCourses] = useState(initialCourses);
  const [activeView, setActiveView] = useState("list");
  const [currentCourse, setCurrentCourse] = useState(null);

  const openEditor = (course = null) => {
    if (course) {
      // FIX: Ensure modules and quizzes exist when opening an existing course
      setCurrentCourse({
        ...course,
        modules: course.modules || [
          { id: 1, title: "Introduction", content: "" },
        ],
        quizzes: course.quizzes || [],
        status: course.status || "Draft",
      });
    } else {
      setCurrentCourse({
        id: Date.now(),
        title: "",
        description: "",
        status: "Draft",
        students: 0,
        color: "#4f46e5",
        modules: [{ id: 1, title: "Introduction", content: "" }],
        quizzes: [],
      });
    }
    setActiveView("editor");
  };

  const saveCourse = () => {
    if (!currentCourse.title) return alert("Title is required");
    setCourses((prev) => {
      const exists = prev.find((c) => c.id === currentCourse.id);
      if (exists) {
        return prev.map((c) => (c.id === currentCourse.id ? currentCourse : c));
      }
      return [currentCourse, ...prev];
    });
    setActiveView("list");
  };

  return (
    <div className="container animate-fadeIn">
      {activeView === "list" ? (
        <ListView
          courses={courses}
          setCourses={setCourses}
          openEditor={openEditor}
        />
      ) : (
        currentCourse && (
          <EditorView
            currentCourse={currentCourse}
            setCurrentCourse={setCurrentCourse}
            setActiveView={setActiveView}
            saveCourse={saveCourse}
          />
        )
      )}
    </div>
  );
};

export default CourseManager;
