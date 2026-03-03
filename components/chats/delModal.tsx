"use client";

import { motion } from "framer-motion";
import DashboardLayout from "../dashboard/Layout";

interface Props {
  isOpen: boolean;
  isSender: boolean;
  onClose: () => void;
  onDeleteForMe: () => void;
  onDeleteForEveryone: () => void;
}

const DeletePopup = ({
  isOpen,
  isSender,
  onClose,
  onDeleteForMe,
  onDeleteForEveryone,
}: Props) => {
  if (!isOpen) return null;

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      {/* Overlay */}
      <div
        className="absolute inset-0  bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      {/* <motion.div
        initial={{ y: 160 }}
        animate={{ y: 0 }}
        exit={{ y: 160 }}
        transition={{ duration: 0.25 }}
        className="relative w-full  max-w-md bg-white dark:bg-gray-800 rounded-t-3xl p-6 shadow-2xl"
      > */}
      <div  className="relative w-full  max-w-md bg-white dark:bg-gray-800 rounded-t-3xl p-6 shadow-2xl">


                  <div className="flex flex-col items-end gap-4">
        <h3 className=" absolute mr-2 top-2 left-1 text-lg font-semibold mb-5 text-center">
          Delete message?
        </h3>
              {isSender && (
                <button
                  onClick={onDeleteForEveryone}
                  className="px-6 py-2 border rounded-full text-black font-medium hover:bg-gray-100 transition"
                >
                  Delete for everyone
                </button>
              )}

              <button
                onClick={onDeleteForMe}
                className="px-6 py-2 border rounded-full text-black font-medium hover:bg-gray-100 transition"
              >
                Delete for me
              </button>

              <button
                onClick={onClose}
                className="px-6 py-2 border rounded-full text-black font-medium hover:bg-gray-100 transition"
              >
                Cancel
              </button>
            </div>
      </div>

      {/* </motion.div> */}
    </div>
 
  );
};

export default DeletePopup;