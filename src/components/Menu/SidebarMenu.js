// import React from 'react';
// import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';
// import '../../styles/SidebarMenu.css';
// import { Link } from 'react-router-dom';
// import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
// import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
// import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
// import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";

// // import WalletRoundedIcon from "@mui/icons-material/WalletRounded";
// // import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
// // import SavingsRoundedIcon from "@mui/icons-material/SavingsRounded";
// // import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
// // import SettingsApplicationsRoundedIcon from "@mui/icons-material/SettingsApplicationsRounded";
// // import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
// // import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
// // import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
// import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";


// const SidebarMenu = () => {
//   const { collapseSidebar } = useProSidebar();
//   return (
//    <div className="app" style={{ display: "flex", height: "100vh" }}>
//       <Sidebar >
//         <Menu collapseSidebar>
//           <MenuItem className="menu1" icon={<MenuRoundedIcon
//                 onClick={() => {
//                   collapseSidebar();
//                 }}
//               />}>
//             <img src="logo192.png" alt="Girl in a jacket" style={{width:"180px",height:"100px"}}></img>
//           </MenuItem>
//           <MenuItem icon={<GridViewRoundedIcon />} component={<Link to="/" />}> Dashboard </MenuItem>
//           <MenuItem icon={<ReceiptRoundedIcon />}> Invoices </MenuItem>
// <MenuItem
//   icon={<BarChartRoundedIcon />}
//   component={<Link to="/addproduct" />}
// >
//   Charts
// </MenuItem>      
//    {/* <SubMenu label="Wallets" icon={<WalletRoundedIcon />}>
//             <MenuItem icon={<AccountBalanceRoundedIcon />}>
//               Current Wallet
//             </MenuItem>
//             <MenuItem icon={<SavingsRoundedIcon />}>Savings Wallet</MenuItem>
//           </SubMenu>
//           <MenuItem icon={<MonetizationOnRoundedIcon />}>Transactions</MenuItem>
//           <SubMenu label="Settings" icon={<SettingsApplicationsRoundedIcon />}>
//             <MenuItem icon={<AccountCircleRoundedIcon />}> Account </MenuItem>
//             <MenuItem icon={<ShieldRoundedIcon />}> Privacy </MenuItem>
//             <MenuItem icon={<NotificationsRoundedIcon />}>
//               Notifications
//             </MenuItem>
//           </SubMenu>*/
//           <MenuItem icon={<LogoutRoundedIcon />} component={<Link to="/login" />}> Logout </MenuItem> }
//         </Menu>
//       </Sidebar>
//     </div>
//   );
// };

// export default SidebarMenu;
