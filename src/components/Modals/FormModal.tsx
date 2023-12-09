import { Children, FormEvent, Fragment, useState, ReactNode } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Plus, X } from "@phosphor-icons/react";
import Datepicker from "react-tailwindcss-datepicker";

interface Props {
  open: boolean;
  setOpen: (arg: boolean) => void;
}

const FormModal: React.FC<Props> = ({ open, setOpen }) => {
  const [keywords, setKeywords] = useState("");
  const [keywordList, setKeywordList] = useState<string[]>([]);

  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleValueChange = (newValue: any) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };

  const handleAddKeyword = (e: FormEvent) => {
    e.preventDefault();
    if (keywords.trim() !== "") {
      setKeywordList((prevList) => [...prevList, keywords.trim()]);
      setKeywords("");
    }
  };

  const handleRemoveKeyword = (e: FormEvent, index: number) => {
    e.preventDefault();
    setKeywordList((prevList) => {
      const newList = [...prevList];
      newList.splice(index, 1);
      return newList;
    });
  };

  return (
    <Transition.Root static show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:p-6 ">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-offset-2"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="sm:flex sm:items-start w-full">
                  <div className="mt-3 text-center  sm:mt-0 sm:text-left w-full ">
                    <Dialog.Title
                      as="h3"
                      className="text-lg  text-center font-semibold leading-6 text-gray-900 mt-6"
                    >
                      Partnership Detail Form
                    </Dialog.Title>
                    <form className="mt-2  space-y-3 w-full">
                      <input
                        placeholder="Name Of Partnership"
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#153D6D] sm:text-sm sm:leading-6"
                      />
                      <select
                        id="location"
                        name="location"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-[#153D6D] sm:text-sm sm:leading-6"
                        defaultValue="--select college--"
                      >
                        <option>--Select College---</option>
                        <option>College Of Health Sciences</option>
                        <option>College Of Basic And Applied Sciences</option>
                        <option>College Of Humanities</option>
                        <option>College Of Education</option>
                      </select>
                      <textarea
                        placeholder="Description"
                        rows={4}
                        name="comment"
                        id="comment"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#153D6D] sm:text-sm sm:leading-6"
                        defaultValue={""}
                      />
                      <select
                        id="location"
                        name="location"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-[#153D6D] sm:text-sm sm:leading-6"
                        defaultValue="--select category--"
                      >
                        <option>--Select Category---</option>
                        <option>Research</option>
                        <option>Development</option>
                        <option>Internship</option>
                        <option>Training</option>
                        <option>Course development</option>
                        <option>Innovation</option>
                        <option>Commercialism</option>
                        <option>Multi-purpose</option>
                      </select>
                      <select
                        id="location"
                        name="location"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-[#153D6D] sm:text-sm sm:leading-6"
                        defaultValue="--select partner type---"
                      >
                        <option>--Select Partner Type---</option>
                        <option>Local Company</option>
                        <option>Foreign Entity</option>
                        <option>Ministry</option>
                        <option>Department or Agency of Government</option>
                      </select>

                      <input
                        placeholder="Industry"
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#153D6D] sm:text-sm sm:leading-6"
                      />
                      <div className="flex items-center space-x-2">
                        <div className="flex  max-w-min rounded-md border  ">
                          <input
                            value={keywords}
                            onChange={(e) => setKeywords(e.target.value)}
                            placeholder="Add Keyword"
                            className="block  rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm  ring-inset placeholder:text-gray-400 focus:ring-0 ring-0 sm:text-sm sm:leading-6"
                          />
                          <button
                            onClick={(e) => handleAddKeyword(e)}
                            className="border-2 border-dotted border-stone-200 py-1 px-1 rounded-md hover:border-[#1391B3]"
                          >
                            <Plus size={20} color="#d6cdcd" />
                          </button>
                        </div>

                        <div className="grid grid-cols-3 grid-rows-3 gap-1 ">
                          {keywordList.map((item, index) => (
                            <span
                              key={index}
                              className="py-1.5 px-1.5 bg-[#E6F1F4] text-[#1391B3] text-sm rounded-md flex space-x-1 items-center justify-between cursor-"
                            >
                              <span>{item}</span>
                              <X
                                size={12}
                                className="cursor-pointer"
                                onClick={(e) => handleRemoveKeyword(e, index)}
                              />
                            </span>
                          ))}
                        </div>
                      </div>

                      <input
                        placeholder="Secondary Partners"
                        className="block  w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#153D6D] sm:text-sm sm:leading-6"
                      />

                      <input
                        placeholder="Duration"
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#153D6D] sm:text-sm sm:leading-6"
                      />
                      <select
                        id="location"
                        name="location"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-[#153D6D] sm:text-sm sm:leading-6"
                        defaultValue="-- select status of partnership---"
                      >
                        <option>-- Select Status Of Partnership---</option>
                        <option>Active</option>
                        <option>Terminated</option>
                      </select>
                      <div>
                        <p className="pl-2">Start Date ~ End Date</p>
                        <Datepicker
                          value={value}
                          onChange={handleValueChange}
                        />
                      </div>

                      <div className="">
                        <div className="flex items-center space-x-3">
                          <label
                            id="input-file"
                            className="cursor-pointer border-dotted border-2 w-10 h-10  flex items-center justify-center "
                          >
                            <input
                              id="input-file"
                              className="hidden"
                              type="file"
                              multiple
                            />
                            <Plus size={20} color="#d6cdcd" />
                          </label>

                          <span>Add relevant files</span>
                        </div>
                      </div>

                      <button className="block w-full rounded-md border-0 py-1.5 px-3 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 bg-[#153D6D]">
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default FormModal;
