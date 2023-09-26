import React from "react";
import Modal from "react-bootstrap/Modal";
import { PurpleButton } from "../CustomizedMaterials";

const CreateTicketTypeModals = (props) => {
  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header className="bg-dark text-light p-4">
        <Modal.Title id="contained-modal-title-vcenter">
          Create Ticket Type
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark text-light p-4">
        <h4>Centered Modal</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam
          veniam consectetur quidem rerum sint! Cum ipsum explicabo accusantium,
          consectetur quam, suscipit esse tenetur quis, quasi corporis maxime.
          Unde doloribus voluptates dicta! Voluptas quas architecto voluptatum
          minus? Ea amet commodi voluptatum aliquam, consequuntur explicabo ut
          quia non dolor velit? Culpa voluptatem quod officiis nesciunt! Ipsa
          voluptatem ad non placeat ea a nobis perspiciatis illo! Tempore itaque
          veniam dolore architecto, perferendis totam, eaque cum voluptates
          eveniet dolores ratione. Numquam incidunt illo praesentium quos
          aliquid aspernatur repellendus magni suscipit maiores, voluptates
          veritatis magnam laudantium ab debitis voluptatibus repellat, rerum
          inventore. Expedita quisquam facere enim sit neque nihil, quae
          reiciendis quam nobis numquam provident temporibus adipisci pariatur
          ipsum fuga quibusdam quidem omnis eum unde. Iure obcaecati sit
          molestiae deserunt velit enim culpa repellendus, ipsam dolores libero
          a ea eos laborum quia debitis modi quis ad suscipit, temporibus
          assumenda corrupti. Aut eius veritatis explicabo voluptates nemo
          accusantium labore saepe rerum quis quod! Soluta maxime maiores modi
          ex itaque corrupti, dicta, impedit veniam sint odio ut atque eum amet
          dolorem voluptatem ullam omnis adipisci officiis reprehenderit ipsam
          ipsum! Facilis, modi praesentium quos veniam laboriosam eligendi
          officia in eos cum magnam architecto! Ipsa tempore expedita voluptates
          fugit.
        </p>
      </Modal.Body>
      <Modal.Footer className="bg-dark p-4">
        <PurpleButton onClick={props.onHide}>Close</PurpleButton>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateTicketTypeModals;
