import React, { useState } from "react";
import axios from "axios"; // Bạn cần cài đặt axios để thực hiện AJAX requests

function ExternalPageLoader() {
  const [externalContent, setExternalContent] = useState("");

  const loadExternalPage = async () => {
    try {
      // Đường link đến trang web ngoại vi
      const externalURL = "https://example.com/external-page";
      // Gửi yêu cầu AJAX để lấy nội dung của trang web ngoại vi
      const response = await axios.get(externalURL);
      // Chèn nội dung vào state để render
      setExternalContent(response.data);
    } catch (error) {
      console.error("Error loading external page:", error);
    }
  };

  return (
    <div>
      <button onClick={loadExternalPage}>Load External Page</button>
      <div dangerouslySetInnerHTML={{ __html: externalContent }} />
    </div>
  );
}

export default ExternalPageLoader;
