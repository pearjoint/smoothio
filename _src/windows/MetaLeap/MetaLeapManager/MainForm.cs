
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.ServiceProcess;
using System.Text;
using System.Windows.Forms;

namespace MetaLeapManager {

	using res = Properties.Resources;

	public partial class MainForm : Form {

		private ServiceControllerStatus lastStatus = ServiceControllerStatus.PausePending;
		private Exception lastError = null;

		public MainForm () {
			InitializeComponent ();
		}

		private void contextExitItem_Click (object sender, EventArgs e) {
			Application.Exit ();
		}

		private void contextShowItem_Click (object sender, EventArgs e) {
			ShowInTaskbar = true;
			Show ();
			Activate ();
			Focus ();
		}

		private void notifyIcon_DoubleClick (object sender, EventArgs e) {
			contextShowItem_Click (sender, e);
		}

		private void serviceTimer_Tick (object sender, EventArgs e) {
			try {
				lastError = null;
				lastStatus  = serviceController.Status;
			} catch (Exception ex) {
				lastStatus = ServiceControllerStatus.Paused;
				lastError = ex;
			}
			UpdateStatus ();
		}

		private void toolStatusDropDown_DropDownOpening (object sender, EventArgs e) {
			if ((lastStatus == ServiceControllerStatus.Paused) && (lastError != null)) {
				MessageBox.Show (this, lastError.Message + ((lastError.InnerException == null) ? string.Empty : ("\r\n\r\n" + lastError.InnerException.Message)), "MetaLeap Manager", MessageBoxButtons.OK, MessageBoxIcon.Error);
				toolStatusDropDown.DropDown.Close ();
			}
		}

		internal void UpdateStatus () {
			toolStatusRestartItem.Enabled = toolStatusStartItem.Enabled = toolStatusStopItem.Enabled = false;
			if (lastStatus == ServiceControllerStatus.Paused)
				toolStatusDropDown.Image = res.img_Error;
			else if (lastStatus == ServiceControllerStatus.Running) {
				toolStatusDropDown.Image = res.img_Service_Running;
				toolStatusRestartItem.Enabled = toolStatusStopItem.Enabled = true;
			} else if ((lastStatus == ServiceControllerStatus.StartPending) || (lastStatus == ServiceControllerStatus.StopPending))
				toolStatusDropDown.Image = res.img_Service_Restart;
			else if (lastStatus == ServiceControllerStatus.Stopped) {
				toolStatusDropDown.Image = res.img_Service_Stopped;
				toolStatusStartItem.Enabled = true;
			} else
				toolStatusDropDown.Image = res.img_Service_Pending;
			toolStatusDropDown.Text = res.ResourceManager.GetString ("ServiceStatus_" + lastStatus);
		}

		protected override void OnClosing (CancelEventArgs e) {
			e.Cancel = true;
			ShowInTaskbar = false;
			Hide ();
			base.OnClosing (e);
		}

		protected override void OnLoad (EventArgs e) {
			Visible = false;
			ShowInTaskbar = false;
			toolStatusLabel.Text = string.Format (toolStatusLabel.Text, Environment.MachineName);
			serviceTimer.Start ();
			base.OnLoad (e);
		}

	}

}
