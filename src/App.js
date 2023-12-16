import { useMemo, useState } from "react";
import {
  AiOutlineSearch as Search,
  AiOutlinePlus as Plus,
} from "react-icons/ai";

const FILTERS = ["All", "Active", "Completed"];

function App() {
  const [tasks, setTasks] = useState([]);

  const [filter, setFilter] = useState(FILTERS[0]);

  const [input, setInput] = useState("");

  const filterTasks = useMemo(() => {
    if (filter === FILTERS[1]) {
      return tasks.filter((task) => task.isCheck === false);
    }
    if (filter === FILTERS[2]) {
      return tasks.filter((task) => task.isCheck === true);
    }
    return tasks;
  }, [filter, tasks]);

  return (
    <section className="min-h-screen flex  justify-center mt-8   ">
      <div className="flex  flex-col w-[500px] space-y-2 ">
        {/* Title */}
        <div className="text-center uppercase text-3xl text-slate-600 font-semibold">
          Things to do
        </div>

        {/* Search input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (input.trim()) {
              console.log(1);
              setTasks([...tasks, { content: input, isCheck: false }]);
            }
          }}
          className="border-slate-500 border rounded-md p-2"
        >
          <input
            type="text"
            className="w-full outline-none"
            placeholder="add new"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </form>
        {/* todo list */}
        {filterTasks.length > 0 &&
          filterTasks.map((task, index) => (
            <div
              key={index}
              className="flex space-x-2 pb-2 border-b-[1px] border-slate-300"
            >
              {/* Checkbox */}
              <input
                type="checkbox"
                checked={task.isCheck}
                onChange={() => {
                  const newTasks = [...tasks];
                  newTasks[index].isCheck = !newTasks[index].isCheck;
                  setTasks([...newTasks]);
                }}
              />

              {/* content */}
              <div className={`${task.isCheck ? "line-through	" : null}`}>
                {task.content}
              </div>
            </div>
          ))}

        {/* Search */}
        <div className="px-4 py-2 bg-[#f5fcea] flex justify-between  ">
          <div className=" flex items-center">
            <Plus className="text-slate-600 " />
            <Search className="text-slate-600 ml-[2px]" />
            <div className="-translate-y-[2px] mx-[16px] text-slate-300">|</div>

            {tasks.length && <div clas>{tasks.length} items left</div>}
          </div>

          {/* left */}
          <div className=" flex items-center">
            {FILTERS.map((filterName, idx) => (
              <div
                key={idx}
                className={`${
                  filter === filterName && "border border-slate-600"
                } px-2 py-[1px] rounded-sm`}
                onClick={() => setFilter(FILTERS[idx])}
              >
                {filterName}
              </div>
            ))}
          </div>
        </div>

        {/* Press Esc */}
      </div>
    </section>
  );
}

export default App;
