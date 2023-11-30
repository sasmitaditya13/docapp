import React,{useState} from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import {  Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownSection,  DropdownItem} from "@nextui-org/react";
import {Popover, PopoverTrigger, PopoverContent, Input} from "@nextui-org/react";
import {Select, SelectItem} from "@nextui-org/react";
import { gettoken,getemail,openproject,createproject ,getowner} from "../../store.js";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import {Card, CardBody} from "@nextui-org/react";
import {Textarea} from "@nextui-org/react";
import { Quill } from "react-quill";
import Editor from "./editor.js";
export default function NavBar() {
              // code the logout function
              const handlelogout = () => {
                  dispatch(gettoken());
                }; 

  const dispatch = useDispatch();
  // const xyz = useSelector(state => state.counter.email)
  const [project,setproject] = useState('project 1');
  const [doc,setdoc] = useState('doc 1');
  const [owner,setowner] = useState();
    const roles = ["Admin","Edit","Read"]
    document.getElementById('editor').style.height = "auto";
    const handleopenproject = () => {
      dispatch(getowner())
      dispatch(openproject(project))

    }
    const handlecreateproject = () => {
      dispatch(createproject(project))
    }
  return (
    <>
    <Navbar isBordered>
      <NavbarBrand>
        <p className="font-bold text-inherit">DOTION</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-16" justify="center">
        <NavbarItem>
        <Dropdown closeOnSelect = {false} >
      <DropdownTrigger>
        <Button 
          variant="ghost" >
          Project
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="new" color="primary"><Popover placement="bottom" showArrow offset={10}>
      <PopoverTrigger>
        <Button className="w-44" color="primary">Add Project</Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px]">
        {(titleProps) => (
          <div className="px-1 py-2 w-full">
            <div className="mt-2 flex flex-col gap-2 w-full">
              <Input value = {project} onChange={(e) => setproject(e.target.value)} label="Project Name" size="sm" variant="bordered" />
              <Input value = {doc} onChange={(e) => setdoc(e.target.value)} defaultValue="first document" label="First document name" size="sm" variant="bordered" />
              <Button>Create Project</Button>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover></DropdownItem>
        <DropdownItem key="copy" color="primary"><Popover placement="bottom" showArrow offset={10}>
      <PopoverTrigger>
        <Button className="w-44" color="primary">Open Project</Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px]">
        {(titleProps) => (
          <div className="px-1 py-2 w-full">
            <div className="mt-2 flex flex-col gap-2 w-full">
              <Input value = {project} onChange={(e) => setproject(e.target.value)} label="Project Name" size="sm" variant="bordered" />
              <Input value = {owner} onChange={(e) => setowner(e.target.value)}  label="Owner email" size="sm" variant="bordered" />
              <Button>Open Project</Button>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover></DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger">
        <Popover placement="bottom" showArrow offset={10}>
      <PopoverTrigger>
        <Button className="w-44" color="danger">Delete Project</Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px]">
        {(titleProps) => (
          <div className="px-1 py-2 w-full">
            <div className="mt-2 flex flex-col gap-2 w-full">
              <Input value = {project} onChange={(e) => setproject(e.target.value)} label="Project Name" size="sm" variant="bordered" />
              <Button>Delete Project</Button>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
        </NavbarItem>
        <NavbarItem>
        <Dropdown closeOnSelect = {false} >
      <DropdownTrigger>
        <Button 
          variant="ghost" >
          Documents
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="new" color="primary"><Popover placement="bottom" showArrow offset={10}>
      <PopoverTrigger>
        <Button className="w-44" color="primary">Add Document</Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px]">
        {(titleProps) => (
          <div className="px-1 py-2 w-full">
            <div className="mt-2 flex flex-col gap-2 w-full">
              <Input value = {doc} onChange={(e) => setdoc(e.target.value)} label="Document Name" size="sm" variant="bordered" />
              <Button>Create Document</Button>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover></DropdownItem>
        <DropdownItem key="copy" color="primary"><Popover placement="bottom" showArrow offset={10}>
      <PopoverTrigger>
        <Button className="w-44" color="primary">Open Document</Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px]">
        {(titleProps) => (
          <div className="px-1 py-2 w-full">
            <div className="mt-2 flex flex-col gap-2 w-full">
              <Input value = {doc} onChange={(e) => setdoc(e.target.value)} label="Project Name" size="sm" variant="bordered" />
              <Button>Open Document</Button>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover></DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger">
        <Popover placement="bottom" showArrow offset={10}>
      <PopoverTrigger>
        <Button className="w-44" color="danger">Delete Document</Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px]">
        {(titleProps) => (
          <div className="px-1 py-2 w-full">
            <div className="mt-2 flex flex-col gap-2 w-full">
              <Input value = {doc} onChange={(e) => setdoc(e.target.value)} label="Document Name" size="sm" variant="bordered" />
              <Button>Delete Document</Button>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
        </NavbarItem>
        <NavbarItem>
        <Dropdown closeOnSelect = {false} >
      <DropdownTrigger>
        <Button 
          variant="ghost" >
          Members
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="new" color="primary"><Popover placement="bottom" showArrow offset={10}>
      <PopoverTrigger>
        <Button className="w-44" color="primary">Add Members</Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px]">
        {(titleProps) => (
          <div className="px-1 py-2 w-full">
            <div className="mt-2 flex flex-col gap-2 w-full">
              <Input label="Member email" size="sm" variant="bordered" />
              <Select
      isRequired
      label="Role"
      placeholder="Select a role"
      defaultSelectedKeys= "Read"
      className="max-w-xs"
    >
        <SelectItem key="Admin"  value="Admin">
          Admin
        </SelectItem>
        <SelectItem key="Edit"  value="Edit">
          Edit
        </SelectItem>
        <SelectItem key="Read"  value="Read">
          Read
        </SelectItem>
    </Select>
              <Button>Add Member</Button>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover></DropdownItem>
    <DropdownItem key="rolechange" color="primary"><Popover placement="bottom" showArrow offset={10}>
      <PopoverTrigger>
        <Button className="w-44" color="primary">Change Role</Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px]">
        {(titleProps) => (
          <div className="px-1 py-2 w-full">
            <div className="mt-2 flex flex-col gap-2 w-full">
              <Input label="Member email" size="sm" variant="bordered" />
              <Select
      isRequired
      label="Role"
      placeholder="Select a role"
      defaultSelectedKeys= "Read"
      className="max-w-xs"
    >
        <SelectItem key="Admin"  value="Admin">
          Admin
        </SelectItem>
        <SelectItem key="Edit"  value="Edit">
          Edit
        </SelectItem>
        <SelectItem key="Read"  value="Read">
          Read
        </SelectItem>
        <SelectItem key="Remove"  value="Remove" color="danger">
          Remove
        </SelectItem>
    </Select>
              <Button>Change Role</Button>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover></DropdownItem>
      </DropdownMenu>
    </Dropdown>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button onClick={handlelogout} color="primary" href="#" variant="flat">
            Logout
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
    <div><Card>
      <CardBody>
        <p className="flex justify-center items-center">Project:   <Textarea
        isReadOnly
        maxRows={1}
      value={project}
    /></p>
    <p className="flex justify-center items-center">Document: <Textarea
        isReadOnly
        maxRows={1}
      value={doc}
    /></p>
      </CardBody>
    </Card></div>
    <Editor></Editor>
    </>
    
  );
}