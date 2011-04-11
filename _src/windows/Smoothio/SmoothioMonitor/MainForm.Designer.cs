namespace SmoothioMonitor {
	partial class MainForm {
		/// <summary>
		/// Required designer variable.
		/// </summary>
		private System.ComponentModel.IContainer components = null;

		/// <summary>
		/// Clean up any resources being used.
		/// </summary>
		/// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
		protected override void Dispose (bool disposing) {
			if (disposing && (components != null)) {
				components.Dispose ();
			}
			base.Dispose (disposing);
		}

		#region Windows Form Designer generated code

		/// <summary>
		/// Required method for Designer support - do not modify
		/// the contents of this method with the code editor.
		/// </summary>
		private void InitializeComponent () {
			this.components = new System.ComponentModel.Container ();
			System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager (typeof (MainForm));
			this.notifyIcon = new System.Windows.Forms.NotifyIcon (this.components);
			this.contextMenuStrip = new System.Windows.Forms.ContextMenuStrip (this.components);
			this.contextShowItem = new System.Windows.Forms.ToolStripMenuItem ();
			this.contextExitItem = new System.Windows.Forms.ToolStripMenuItem ();
			this.serviceController = new System.ServiceProcess.ServiceController ();
			this.toolStrip = new System.Windows.Forms.ToolStrip ();
			this.toolStatusLabel = new System.Windows.Forms.ToolStripLabel ();
			this.toolStatusDropDown = new System.Windows.Forms.ToolStripDropDownButton ();
			this.toolStatusStartItem = new System.Windows.Forms.ToolStripMenuItem ();
			this.toolStatusStopItem = new System.Windows.Forms.ToolStripMenuItem ();
			this.toolStatusRestartItem = new System.Windows.Forms.ToolStripMenuItem ();
			this.serviceTimer = new System.Windows.Forms.Timer (this.components);
			this.tabControl1 = new System.Windows.Forms.TabControl ();
			this.tabPage1 = new System.Windows.Forms.TabPage ();
			this.instanceSummary2 = new SmoothioMonitor.InstanceSummary ();
			this.instanceSummary1 = new SmoothioMonitor.InstanceSummary ();
			this.tabPage2 = new System.Windows.Forms.TabPage ();
			this.instanceEditor1 = new SmoothioMonitor.InstanceEditor ();
			this.openFileDialog1 = new System.Windows.Forms.OpenFileDialog ();
			this.contextMenuStrip.SuspendLayout ();
			this.toolStrip.SuspendLayout ();
			this.tabControl1.SuspendLayout ();
			this.tabPage1.SuspendLayout ();
			this.tabPage2.SuspendLayout ();
			this.SuspendLayout ();
			// 
			// notifyIcon
			// 
			this.notifyIcon.ContextMenuStrip = this.contextMenuStrip;
			resources.ApplyResources (this.notifyIcon, "notifyIcon");
			this.notifyIcon.DoubleClick += new System.EventHandler (this.notifyIcon_DoubleClick);
			// 
			// contextMenuStrip
			// 
			this.contextMenuStrip.Items.AddRange (new System.Windows.Forms.ToolStripItem [] {
            this.contextShowItem,
            this.contextExitItem});
			this.contextMenuStrip.Name = "contextMenuStrip";
			resources.ApplyResources (this.contextMenuStrip, "contextMenuStrip");
			// 
			// contextShowItem
			// 
			this.contextShowItem.Name = "contextShowItem";
			resources.ApplyResources (this.contextShowItem, "contextShowItem");
			this.contextShowItem.Click += new System.EventHandler (this.contextShowItem_Click);
			// 
			// contextExitItem
			// 
			this.contextExitItem.Name = "contextExitItem";
			resources.ApplyResources (this.contextExitItem, "contextExitItem");
			this.contextExitItem.Click += new System.EventHandler (this.contextExitItem_Click);
			// 
			// serviceController
			// 
			this.serviceController.ServiceName = "SmoothioDaemon";
			// 
			// toolStrip
			// 
			this.toolStrip.GripStyle = System.Windows.Forms.ToolStripGripStyle.Hidden;
			this.toolStrip.Items.AddRange (new System.Windows.Forms.ToolStripItem [] {
            this.toolStatusLabel,
            this.toolStatusDropDown});
			resources.ApplyResources (this.toolStrip, "toolStrip");
			this.toolStrip.Name = "toolStrip";
			// 
			// toolStatusLabel
			// 
			resources.ApplyResources (this.toolStatusLabel, "toolStatusLabel");
			this.toolStatusLabel.Name = "toolStatusLabel";
			// 
			// toolStatusDropDown
			// 
			this.toolStatusDropDown.DropDownItems.AddRange (new System.Windows.Forms.ToolStripItem [] {
            this.toolStatusStartItem,
            this.toolStatusStopItem,
            this.toolStatusRestartItem});
			this.toolStatusDropDown.Image = global::SmoothioMonitor.Properties.Resources.img_Service_Pending;
			resources.ApplyResources (this.toolStatusDropDown, "toolStatusDropDown");
			this.toolStatusDropDown.Name = "toolStatusDropDown";
			this.toolStatusDropDown.DropDownOpening += new System.EventHandler (this.toolStatusDropDown_DropDownOpening);
			// 
			// toolStatusStartItem
			// 
			resources.ApplyResources (this.toolStatusStartItem, "toolStatusStartItem");
			this.toolStatusStartItem.Image = global::SmoothioMonitor.Properties.Resources.img_Service_Running;
			this.toolStatusStartItem.Name = "toolStatusStartItem";
			// 
			// toolStatusStopItem
			// 
			resources.ApplyResources (this.toolStatusStopItem, "toolStatusStopItem");
			this.toolStatusStopItem.Image = global::SmoothioMonitor.Properties.Resources.img_Service_Stopped;
			this.toolStatusStopItem.Name = "toolStatusStopItem";
			// 
			// toolStatusRestartItem
			// 
			resources.ApplyResources (this.toolStatusRestartItem, "toolStatusRestartItem");
			this.toolStatusRestartItem.Image = global::SmoothioMonitor.Properties.Resources.img_Service_Restart;
			this.toolStatusRestartItem.Name = "toolStatusRestartItem";
			// 
			// serviceTimer
			// 
			this.serviceTimer.Interval = 2000;
			this.serviceTimer.Tick += new System.EventHandler (this.serviceTimer_Tick);
			// 
			// tabControl1
			// 
			this.tabControl1.Controls.Add (this.tabPage1);
			this.tabControl1.Controls.Add (this.tabPage2);
			resources.ApplyResources (this.tabControl1, "tabControl1");
			this.tabControl1.Name = "tabControl1";
			this.tabControl1.SelectedIndex = 0;
			// 
			// tabPage1
			// 
			this.tabPage1.Controls.Add (this.instanceSummary2);
			this.tabPage1.Controls.Add (this.instanceSummary1);
			resources.ApplyResources (this.tabPage1, "tabPage1");
			this.tabPage1.Name = "tabPage1";
			this.tabPage1.UseVisualStyleBackColor = true;
			// 
			// instanceSummary2
			// 
			resources.ApplyResources (this.instanceSummary2, "instanceSummary2");
			this.instanceSummary2.Name = "instanceSummary2";
			// 
			// instanceSummary1
			// 
			resources.ApplyResources (this.instanceSummary1, "instanceSummary1");
			this.instanceSummary1.Name = "instanceSummary1";
			// 
			// tabPage2
			// 
			this.tabPage2.Controls.Add (this.instanceEditor1);
			resources.ApplyResources (this.tabPage2, "tabPage2");
			this.tabPage2.Name = "tabPage2";
			this.tabPage2.UseVisualStyleBackColor = true;
			// 
			// instanceEditor1
			// 
			resources.ApplyResources (this.instanceEditor1, "instanceEditor1");
			this.instanceEditor1.Name = "instanceEditor1";
			// 
			// openFileDialog1
			// 
			this.openFileDialog1.FileName = "openFileDialog1";
			// 
			// MainForm
			// 
			resources.ApplyResources (this, "$this");
			this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
			this.Controls.Add (this.tabControl1);
			this.Controls.Add (this.toolStrip);
			this.Name = "MainForm";
			this.contextMenuStrip.ResumeLayout (false);
			this.toolStrip.ResumeLayout (false);
			this.toolStrip.PerformLayout ();
			this.tabControl1.ResumeLayout (false);
			this.tabPage1.ResumeLayout (false);
			this.tabPage2.ResumeLayout (false);
			this.ResumeLayout (false);
			this.PerformLayout ();

		}

		#endregion

		private System.Windows.Forms.NotifyIcon notifyIcon;
		private System.Windows.Forms.ContextMenuStrip contextMenuStrip;
		private System.Windows.Forms.ToolStripMenuItem contextExitItem;
		private System.Windows.Forms.ToolStripMenuItem contextShowItem;
		private System.ServiceProcess.ServiceController serviceController;
		private System.Windows.Forms.ToolStrip toolStrip;
		private System.Windows.Forms.Timer serviceTimer;
		private System.Windows.Forms.ToolStripLabel toolStatusLabel;
		private System.Windows.Forms.ToolStripDropDownButton toolStatusDropDown;
		private System.Windows.Forms.ToolStripMenuItem toolStatusStopItem;
		private System.Windows.Forms.ToolStripMenuItem toolStatusStartItem;
		private System.Windows.Forms.ToolStripMenuItem toolStatusRestartItem;
		private System.Windows.Forms.TabControl tabControl1;
		private System.Windows.Forms.TabPage tabPage1;
		private System.Windows.Forms.TabPage tabPage2;
		private System.Windows.Forms.OpenFileDialog openFileDialog1;
		private InstanceEditor instanceEditor1;
		private InstanceSummary instanceSummary1;
		private InstanceSummary instanceSummary2;
	}
}

