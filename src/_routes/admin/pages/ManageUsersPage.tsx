import { columns } from "@/_routes/admin/components/student-data/Coloumns";
import { ExamDataType, UserDataType } from "@/types";
import { DataTable } from "../components/student-data/DataTable";
import { useOutletContext } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Tabs } from "../components/Tabs";
import MarksTab from "../components/tabs/MarksTab";
import InfoTab from "../components/tabs/InfoTab";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase/config";

import SendMessage from "../components/SendMessage";

type OutletContextType = {
  usersData: UserDataType[] | null;
};

const ManageUsersPage = () => {
  const { usersData } = useOutletContext<OutletContextType>();
  const [openDetailsPopup, setOpenDetailsPopup] = useState(false);
  const [openSendMessagePopup, setOpenSendMessagePopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserDataType | null>(null);
  const [examsData, setExamsData] = useState<Array<ExamDataType> | null>(null);

  // console.log(selectedUser);

  useEffect(() => {
    if (selectedUser) {
      const collectionRef = query(
        collection(db, "users", selectedUser?.uid, "exams"),
        orderBy("examDate", "asc")
      );
      const unsubscribe = onSnapshot(collectionRef, (QuerySnapshot) => {
        const examsDataArr = QuerySnapshot.docs.map((doc) => ({
          ...doc.data(),
        })) as ExamDataType[];

        setExamsData(examsDataArr);
      });

      return unsubscribe;
    }
  }, [selectedUser]);

  const tabs = [
    {
      label: "Marks",
      value: "marks",
      content: <MarksTab examsData={examsData} />,
    },
    {
      label: "Info",
      value: "info",
      content: <InfoTab userInfo={selectedUser} />,
    },
  ];

  return (
    <div className="p-2 md:p-5 w-full h-full overflow-auto">
      <Card>
        <CardContent>
          {usersData && (
            <DataTable
              columns={columns(
                setOpenDetailsPopup,
                setSelectedUser,
                usersData,
                setOpenSendMessagePopup
              )}
              data={usersData?.map((user) => ({
                name: user.userName,
                email: user.email,
                uid: user.uid,
              }))}
            />
          )}
        </CardContent>
      </Card>

      <SendMessage
        openSendMessagePopup={openSendMessagePopup}
        setOpenSendMessagePopup={setOpenSendMessagePopup}
        selectedUser={selectedUser}
      />

      <Drawer open={openDetailsPopup} onOpenChange={setOpenDetailsPopup}>
        <DrawerContent className="w-full h-[90%] p-10 overflow-aut">
          <Tabs tabs={tabs} />
        </DrawerContent>
      </Drawer>
    </div>
  );
};
export default ManageUsersPage;
