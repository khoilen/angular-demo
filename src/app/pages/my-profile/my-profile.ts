import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService, ProfileResponse } from '../..//services/user.service';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-my-profile',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './my-profile.html',
})
export class MyProfile implements OnInit {
  userData!: ProfileResponse['userData'];
  isEdit = false;
  image: File | null = null;
  profileForm!: FormGroup;

  constructor(
    private userService: UserService,
    private toast: ToastService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.userService.user$.subscribe((res) => {
      if (res?.userData) {
        this.userData = res.userData;
        this.initForm();
      }
    });
  }

  initForm() {
    this.profileForm = this.fb.group({
      name: [this.userData?.name ?? ''],
      phone: [this.userData?.phone ?? ''],
      addressLine1: [this.userData?.address?.line1 ?? ''],
      addressLine2: [this.userData?.address?.line2 ?? ''],
      gender: [this.userData?.gender ?? ''],
      dob: [this.userData?.dob ?? ''],
    });
  }

  onFileChange(event: any) {
    this.image = event.target.files[0];
  }

  async updateUserProfileData() {
    const token = this.userService.getToken();
    if (!token) {
      this.toast.error('Not authenticated');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.profileForm.value.name);
    formData.append('phone', this.profileForm.value.phone);
    formData.append(
      'address',
      JSON.stringify({
        line1: this.profileForm.value.addressLine1,
        line2: this.profileForm.value.addressLine2,
      })
    );
    formData.append('gender', this.profileForm.value.gender);
    formData.append('dob', this.profileForm.value.dob);

    if (this.image) {
      formData.append('image', this.image);
    }

    try {
      const res: any = await this.userService.updateProfile(formData);
      if (res.success) {
        this.toast.success(res.message);
        this.userService.loadUserProfileData();
        this.isEdit = false;
        this.image = null;
      } else {
        this.toast.error(res.message);
      }
    } catch (error: any) {
      this.toast.error(error.message || 'Something went wrong');
    }
  }
}
