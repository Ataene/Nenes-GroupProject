import React, { useCallback, useState } from "react";

export default function useDialogModal(Component) {
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState("");


  const openDialog = useCallback((props) => {
    console.log(props);
    setItem(props);
    setOpen(true);
  }, []);

  const DialogComponent = useCallback(
    ({ ...props }) => {
      if (!open) return null;

      if (Component) {
        return (
          <Component open={open} onClose={() => setOpen(false)} {...props} item={item} />
        );
      }
    },
    [open, Component]
  );

  return [DialogComponent, openDialog];
}
