"use client";

import React, { useState } from "react";
import moment from "moment";
import { IoClose } from "react-icons/io5";
import { Alert, Snackbar } from "@mui/material";

type CardProps = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  message: string;
  created_at: string;
  onDelete: () => void;
};

const Card = ({ id, firstName, lastName, phone, message, created_at, onDelete }: CardProps) => {
  const formattedDate = moment(created_at).format("MMM Do YY");

  const [loading, setLoading] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const alert = () => {
    console.log("Alert")
    return (
      <Snackbar open={true} autoHideDuration={6000} onClose={() => setShowAlert(false)}>
        <Alert
          onClose={() => setShowAlert(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}>
          Message Deleted
        </Alert>
      </Snackbar>
    )
  }

  const deleteMessage = async (id: any, onDelete: () => void) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setShowAlert(true);
        onDelete();
      }
    } catch (error) {
      console.error("Error deleting message", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-primary">
      {loading ? (
        <div className="flex justify-center py-[8%]">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      ) : (
        <div className="w-full cursor-pointer p-6 border-[1px] border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out rounded-xl">
          <div className="w-full flex justify-between">
            <div className="w-full text-2xl">
              {firstName} {lastName}
            </div>
            <div>
              <IoClose
                onClick={() => deleteMessage(id, onDelete)}
                className="text-[25px] cursor-pointer text-gray-500 hover:text-gray-600 transition-all duration-300 ease-in-out"
              />
            </div>
          </div>
          <div className="w-full text-md">{phone}</div>
          <div className="w-full text-md">{message}</div>
          <div className="w-full flex justify-end text-sm">{formattedDate}</div>
          {showAlert && alert()}
        </div>
      )}
    </div>
  );
};

export default Card;
