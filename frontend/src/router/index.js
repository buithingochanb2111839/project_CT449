import { createWebHistory, createRouter } from "vue-router";

const routes = [
   {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginSelection.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/Register.vue"),
  },
  {
     path: "/",
     name: "sach",
     component: () => import("@/views/BookList.vue")
   },
   {
     path: "/sach/themsach",
     name: "addsach",
     component: () => import("@/views/AddSach.vue")
   },
   {
     path: "/sach/suasach/:id",
     name: "editsach",
     component: () => import("@/views/EditBook.vue")
   },
   {
     path: "/nhanvien/themnhanvien",
     name: "addnhanvien",
     component: () => import("@/views/AddNhanVien.vue")
   },
   {
     path: "/theodoi/muon/:bookId",
     name: "muon",
     component: () => import("@/views/BorrowView.vue")
   },
  {
    path: "/nxb",
    name: "nhaxuatban",
    component: () => import("@/views/NXBList.vue"),
  },
  {
     path: "/theodoi",
     name: "theodoi",
     component: () => import("@/views/BorrowList.vue"),
   },
  {
    path: "/docgia",
    name: "alldocgia",
    component: () => import("@/views/DocGiaList.vue"),
  },
  {
    path: "/nhanvien",
    name: "nhanvien",
    component: () => import("@/views/NhanVienList.vue"),
  },
  {
    path: "/nguoi/:id",
    name: "editnhanvien",
    component: () => import("@/views/EditNhanVien.vue"),
  },
  {
  path: '/editdocgia/:id',
  name: 'editdocgia',
  component: () => import('@/views/EditDocGia.vue'),
  }

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
